/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'utils/hocs/localize';
import { MdCheck } from 'react-icons/md';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/**
 * Internal dependencies
 */
import {
	Avatar,
	Button,
	Box,
	Flex,
	Heading,
	Link,
	OptionRow,
	Text,
	Badge,
} from '@automattic/vip-design-system';
import { EnvironmentCard, Event, LinkExternal, PageLoading, PullRequests } from 'components';
import { timeAgo } from 'utils/time';
import { useFeature, usePermissions } from 'utils/hooks';
import { canLaunchApp, getEnvironmentByUniqueLabel, getGitHubAvatarUrl } from 'Utils';
import header from 'assets/images/header.png';
import {
	ENVIRONMENTS_SOFTWARE_DETAILS_PERMISSIONS,
	ENVIRONMENTS_DEPLOYMENTS_LOGS_PERMISSIONS,
} from 'utils/permissions';
import { DEPLOYMENT_STATUS } from 'lib/general/constants';
import { useGetAppQuery } from 'generated/graphql';
import ScreenReaderText from 'components/ScreenReaderText';

// These components are only used temporarly as we move everything to k8s
const OldDeployInformation = ( { deploy } ) => {
	return (
		<Event
			avatarSrc={ deploy.commits?.edges[ 0 ].author.avatarUrl }
			title={
				<Heading variant="h3" sx={ { mb: 1, fontSize: 2 } }>
					Deployed{ ' ' }
					<Link href={ deploy.commits?.edges[ 0 ].url }>
						{ deploy.commits?.edges[ 0 ].oid.substring( 0, 7 ) }
					</Link>{ ' ' }
					from{ ' ' }
					<Link href={ `https://github.com/${ deploy.repo }/tree/${ deploy.branch }` }>
						{ deploy.branch }
					</Link>
				</Heading>
			}
			body={
				<Text sx={ { mb: 0, fontSize: 2 } }>{ deploy.commits.edges[ 0 ].messageHeadline }</Text>
			}
			time={ timeAgo.format( new Date( deploy.deployed_at ) ) }
		/>
	);
};

OldDeployInformation.propTypes = {
	deploy: PropTypes.shape( {
		commits: PropTypes.array,
		repo: PropTypes.string,
		branch: PropTypes.string,
		deployed_at: PropTypes.string,
	} ),
};

const NewDeployInformation = localize( ( { selectedEnvironment, translate, deploy, moment } ) => {
	const history = useHistory();
	const commitHash = deploy.commit_sha.substring( 0, 7 );

	const linkUrl = `/apps/${ selectedEnvironment.appId }/${ selectedEnvironment.uniqueLabel }/deploys/${ deploy.id }`;

	const handleDeployClick = e => {
		if ( e?.target?.classList.contains( 'deploy-commit-link' ) ) {
			e.stopPropagation();
			return;
		}

		e.preventDefault();
		history.push( linkUrl );
	};

	const DeployLabel = (
		<>
			Deployed{ ' ' }
			<LinkExternal
				className="deploy-commit-link"
				href={ `https://github.com/${ deploy.repo }/commit/${ deploy.commit_sha }` }
			>
				{ commitHash }
			</LinkExternal>{ ' ' }
			{ deploy.isLatest && (
				<Badge variant="green" sx={ { m: 0, ml: 3, minWidth: '80px', textAlign: 'center' } }>
					{ translate( 'Active Code' ) }
				</Badge>
			) }
			{ deploy.inProgress && (
				<Badge variant="blue" sx={ { m: 0, ml: 3 } }>
					{ translate( 'Deploying' ) }
				</Badge>
			) }
			{ deploy.deployment_status === DEPLOYMENT_STATUS.ERROR && (
				<Badge variant="red" sx={ { m: 0, ml: 3 } }>
					{ translate( 'Failed' ) }
				</Badge>
			) }
		</>
	);

	return (
		<OptionRow
			small
			label={ DeployLabel }
			as="div"
			body={
				<Text as="span" sx={ { mb: 0, fontSize: 2 } }>
					{ deploy.commit_description }
				</Text>
			}
			icon={ <Avatar src={ getGitHubAvatarUrl( deploy.commit_author ) } /> }
			meta={ timeAgo.format( moment.utc( deploy.createdAt ).toDate() ) }
			onClick={ handleDeployClick }
		/>
	);
} );

NewDeployInformation.propTypes = {
	deploy: PropTypes.shape( {
		commit_description: PropTypes.string,
		commit_sha: PropTypes.string,
		commit_author: PropTypes.string,
		repo: PropTypes.string,
		deployment_status: PropTypes.string,
		createdAt: PropTypes.string,
	} ),
	moment: PropTypes.func,
};

const Todo = () => (
	<Box sx={ { width: 24, textAlign: 'center' } }>
		<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="4" cy="4" r="4" fill="#C8C8C8" />
		</svg>
	</Box>
);

export const Dashboard = ( {
	selectedEnvironment,
	moment,
	match: {
		params: { id },
	},
} ) => {
	const { hasManyPermissions } = usePermissions( selectedEnvironment?.permissions );
	const [ canReadSoftwareData ] = hasManyPermissions( ENVIRONMENTS_SOFTWARE_DETAILS_PERMISSIONS );
	const [ canReadDeploys ] = hasManyPermissions( ENVIRONMENTS_DEPLOYMENTS_LOGS_PERMISSIONS );
	const { isFeatureEnabled } = useFeature();

	// query for getting app data
	const { loading, data } = useGetAppQuery( {
		errorPolicy: 'all',
		variables: {
			id,
			// Only fetches old deploys field for non-k8s environments
			fetchDeploys: canReadDeploys && ! selectedEnvironment?.isK8sResident,
			fetchSoftwareData: canReadSoftwareData && isFeatureEnabled( 'tool:/software-versions' ),
		},
	} );

	const appData = data?.app;

	if ( loading ) {
		return <PageLoading />;
	}

	const environmentData = getEnvironmentByUniqueLabel( appData, selectedEnvironment.uniqueLabel );
	const deploys = environmentData?.isK8sResident
		? environmentData?.deployments?.nodes
		: environmentData?.deploys?.edges;
	const hasDeployed = deploys?.length && deploys?.length > 0;
	const pullRequestNodes = environmentData?.pullRequests?.nodes;
	const pullRequestTotal = environmentData?.pullRequests?.total;
	let formattedDate = new Date( environmentData?.createdAt );
	formattedDate = formattedDate.toDateString();
	const showLaunchWizard = canLaunchApp( appData, environmentData?.uniqueLabel );
	const showChecklist = ! environmentData?.launched && environmentData?.type === 'production';

	return (
		<Box sx={ { mb: 6 } }>
			<Helmet>
				<title>{ appData.name } Dashboard</title>
			</Helmet>

			<Box sx={ { marginBottom: 4 } }>
				<Heading variant="h1" sx={ { display: 'flex', alignItems: 'center', mb: 1 } }>
					<ScreenReaderText>{ appData.name } </ScreenReaderText>Dashboard
				</Heading>
			</Box>
			{ ! hasDeployed && (
				<Box
					sx={ {
						bg: 'backgroundSecondary',
						backgroundImage: `url(${ header })`,
						backgroundSize: '1211px 527px',
						backgroundPosition: '590px 0',
						backgroundRepeat: 'no-repeat',
						px: 5,
						mx: -4,
						mb: 5,
					} }
				>
					<Box sx={ { py: 5 } }>
						<Heading variant="h4">Welcome to your new environment!</Heading>
						<Text>Here are a few things you should know before you get started.</Text>
						<Text>
							<LinkExternal href="https://docs.wpvip.com/technical-references/development-workflow/">
								Developing with VIP →
							</LinkExternal>
						</Text>
						<Text>
							<LinkExternal href="https://docs.wpvip.com/technical-references/vip-codebase/">
								Understanding your VIP codebase →
							</LinkExternal>
						</Text>
						<Text>
							<LinkExternal href="https://docs.wpvip.com/technical-references/vip-support/accessing-vip-support/">
								Accessing VIP support →
							</LinkExternal>
						</Text>
					</Box>
				</Box>
			) }
			<Box sx={ { my: 4 } }>
				{ ! loading && environmentData ? (
					<Flex sx={ { justifyContent: 'top', flexWrap: 'wrap' } }>
						<Box
							sx={ {
								mr: [ 0, 0, 48 ],
								mb: 4,
								maxWidth: 480,
								minWidth: [ '100%', 480, 480 ],
								flex: '1 1 0',
							} }
						>
							<Box
								sx={ {
									mb: 3,
									position: 'sticky',
									top: 4,
								} }
							>
								{ <EnvironmentCard environment={ environmentData } app={ appData } /> }
							</Box>
						</Box>

						<Box sx={ { width: 400, flex: '1 1 auto' } }>
							{ showChecklist && (
								<Box mb={ 4 }>
									<Flex sx={ { alignItems: 'center' } }>
										<Heading variant="h3" as="h2" sx={ { mb: 3, flex: '1 1 auto' } }>
											Launch Checklist
										</Heading>
										{ showLaunchWizard && (
											<Button
												variant="text"
												as={ RouterLink }
												to={ `/apps/${ appData.id }/${ environmentData.uniqueLabel }/launch` }
											>
												Use the launch wizard →
											</Button>
										) }
									</Flex>
									<Box sx={ { mb: 4, borderTop: '1px solid', borderTopColor: 'border' } }>
										<OptionRow
											small
											label="Build your site"
											as={ LinkExternal }
											href={ 'https://docs.wpvip.com/technical-references/development-workflow/' }
											body="Learn about the VIP way of working and commit your first code"
											icon={
												hasDeployed ? (
													<MdCheck
														size={ 24 }
														sx={ {
															color: 'green.50',
															display: 'block',
														} }
													/>
												) : (
													<Todo />
												)
											}
										/>
										<OptionRow
											small
											label="Add a custom domain"
											as={ RouterLink }
											to={ `/apps/${ appData.id }/${ environmentData.uniqueLabel }/domains` }
											body="Prepare your site for launch by adding a custom domain"
											icon={
												selectedEnvironment.domains?.total ? (
													<MdCheck
														size={ 24 }
														sx={ {
															color: 'green.50',
															display: 'block',
														} }
													/>
												) : (
													<Todo />
												)
											}
										/>
										<OptionRow
											small
											label="Configure DNS"
											as={ LinkExternal }
											href={ 'https://docs.wpvip.com/technical-references/domains-ssl/dns/' }
											body="Update your DNS to point to VIP"
											icon={
												environmentData.launched ? (
													<MdCheck
														size={ 24 }
														sx={ {
															color: 'green.50',
															display: 'block',
														} }
													/>
												) : (
													<Todo />
												)
											}
										/>
									</Box>
								</Box>
							) }

							<Box sx={ { mb: 4 } }>
								<PullRequests
									pullRequests={ pullRequestNodes }
									total={ pullRequestTotal }
									appData={ appData }
									selectedEnvironment={ selectedEnvironment }
								/>
								<Heading variant="h3" as="h2" sx={ { mb: 3 } }>
									Deployments
								</Heading>
								{ hasDeployed ? (
									<React.Fragment>
										{ environmentData.isK8sResident
											? deploys
													.slice( 0, 3 )
													.map( ( deploy, index ) => (
														<NewDeployInformation
															deploy={ deploy }
															key={ index }
															moment={ moment }
															selectedEnvironment={ selectedEnvironment }
														/>
													) )
											: deploys.map( ( deploy, index ) => (
													<OldDeployInformation deploy={ deploy } key={ index } />
											  ) ) }
										{ isFeatureEnabled( 'route:/apps/:id/:environment/deploys' ) &&
											environmentData.isK8sResident && (
												<Button
													variant="text"
													as={ RouterLink }
													to={ `/apps/${ appData.id }/${ environmentData.uniqueLabel }/deploys` }
												>
													More deployments <span aria-hidden>→</span>
												</Button>
											) }
									</React.Fragment>
								) : (
									<Text sx={ { color: 'muted' } }>
										This environment has not been updated since it was first deployed on{ ' ' }
										<strong>{ formattedDate }</strong>
									</Text>
								) }
							</Box>
						</Box>
					</Flex>
				) : (
					<PageLoading />
				) }
			</Box>
		</Box>
	);
};

/**
 * propTypes
 */
Dashboard.propTypes = {
	selectedEnvironment: PropTypes.object,
	translate: PropTypes.func,
	moment: PropTypes.func,
	match: PropTypes.object, // From router
};

export default localize( Dashboard );
