# Dropdown Component Redesign Implementation Plan

## Overview
This plan outlines the implementation of the new Dropdown component design based on the Figma specifications. The redesign includes improved styling, new component states, and enhanced functionality.

## Design Analysis

### Current vs. New Design Changes

#### **DropdownContent Container**
- **Current**: `minWidth: 220, px: 2, py: 1` (8px horizontal, 4px vertical padding)
- **New**: `space/2: 8` (8px all around)
- **Shadow**: `shadow/3`
- **Border Radius**: 3px (TODO: token shows `borderRadius/static/2: 4`, design shows 3px)
- **Background**: `color/layer/2: #ffffff`

#### **DropdownItem**
- **Height**: 32px (`min-h-8`) - increased from 25px
- **Padding**: Left `space/5: 24` + `space/1: 4` = 28px, Right `space/4: 16`, Vertical `space/1: 4`
- **Gap**: 6px between elements (TODO: map to design system)
- **Typography**: `text/default` (14px regular, letter-spacing 0.14px TODO)

#### **DropdownLabel (Group Title)**
- **Typography**: `heading/caps` (12px semibold, uppercase, letter-spacing 0.6px TODO)
- **Padding**: Left `space/5: 24`, Right `space/4: 16`, Vertical `space/1: 4`
- **Color**: `color/text/secondary: #514e4d`

#### **DropdownSeparator**
- **Height**: 1px
- **Color**: `color/border/2: #e3e0df`
- **Padding**: Horizontal `space/5: 24`

## Component Features & States

### DropdownItem Props Interface
```typescript
interface DropdownItemProps {
  label?: string;                    // Main text
  icon?: React.ReactNode | null;     // Leading icon
  isSelected?: boolean;              // Shows check mark on left (absolute positioned)
  showBadge?: boolean;               // Shows badge on right
  showIcon?: boolean;                // Shows icon before label
  secondaryLabel?: string;           // Secondary text after main label
  hasSecondaryLabel?: boolean;       // Controls secondary label visibility
  state?: "default" | "hover" | "disabled" | "loading" | "empty";
  badge?: React.ReactNode;           // Custom badge component
  className?: string;
  // ... other Radix props
}
```

### Visual States

#### **Default State**
- Standard item appearance
- 32px height, `color/text/secondary: #514e4d`

#### **Hover State**
- Background: `color/input/radio-box/background/hover: #f4f3f2`
- Text remains same color

#### **Disabled State**
- Text color: `color/text/disabled: #9b9796`
- No pointer events

#### **Loading State**
- BiLoaderAlt icon (20px, from react-icons/bi)
- Text: "Loading..."
- Icon positioned with 6px gap from text

#### **Empty State**
- BiQuestionMark icon (20px, from react-icons/bi)
- Text: "Nothing found..."
- Icon positioned with 6px gap from text

#### **Selected State**
- BiCheck icon positioned absolute at `left-1 top-1.5` (4px from left, 6px from top)
- 20px icon size
- Shows in addition to other content

#### **With Badge**
- Badge positioned on the right
- Example: Yellow badge with "Primary" text
- Background: `color/tag/yellow/background: #ffe2c2`
- Text: `color/tag/yellow/text: #491d00`
- Typography: `support/label-xs` (11px regular)

#### **With Icon**
- BiCheck or other icon before the label
- 20px size, 6px gap from text

#### **With Secondary Label**
- Secondary text after main label in same line
- Typography: `text/small` (12px regular, letter-spacing 0.12px TODO)
- Gap between primary and secondary labels (TODO: map spacing)

## Implementation Tasks

### 1. Update DropdownContent.tsx
- [ ] Update padding to 8px all around
- [ ] Set shadow to shadow.3
- [ ] Set border radius to 3px
- [ ] Ensure white background

### 2. Complete Rewrite of DropdownItem.tsx
- [ ] New props interface with all state options
- [ ] State-based rendering (default, hover, disabled, loading, empty)
- [ ] Icon integration using react-icons/bi
- [ ] Selected state with absolute positioned check mark
- [ ] Badge support
- [ ] Secondary label support
- [ ] Proper gap and padding implementation
- [ ] Height change to 32px

### 3. Update DropdownLabel.tsx
- [ ] Uppercase text transformation
- [ ] 12px font size with semibold weight
- [ ] Letter spacing 0.6px
- [ ] New padding: pl-6 pr-4 py-1
- [ ] Color: #514e4d

### 4. Update DropdownSeparator.tsx
- [ ] Color: #e3e0df
- [ ] Horizontal padding: px-6
- [ ] 1px height

### 5. Add New Icon Components
- [ ] Import BiLoaderAlt, BiQuestionMark, BiCheck from react-icons/bi
- [ ] Standardize icon sizing (20px)

### 6. Update Stories
- [ ] Showcase all new states
- [ ] Demonstrate icon usage
- [ ] Show badge integration
- [ ] Display secondary labels
- [ ] Group examples

## Design Token Mapping

### Available Design Tokens (Use These)

#### **Colors**
- `color/text/secondary: #514e4d` → Main text color
- `color/input/radio-box/background/hover: #f4f3f2` → Hover background
- `color/text/disabled: #9b9796` → Disabled text color
- `color/border/2: #e3e0df` → Separator/divider color
- `color/layer/2: #ffffff` → Background color
- `color/tag/yellow/background: #ffe2c2` → Yellow badge background
- `color/tag/yellow/text: #491d00` → Yellow badge text
- `color/icon/primary: #2c2a29` → Icon color

#### **Typography**
- `fontSize/static/2: 14` → Main item text (14px)
- `fontSize/static/1: 12` → Group label text (12px)
- `fontSize/static/0: 11` → Badge text (11px)
- `fontFamily/body: Aktiv Grotesk VF` → Body font family
- `fontFamily/heading: Aktiv Grotesk VF` → Heading font family
- `fontWeight/regular: 400` → Regular weight
- `fontWeight/semiBold: 600` → Semibold weight

#### **Typography Combinations**
- `text/default` → Main item text (14px regular, line-height 1.5)
- `text/small` → Secondary label text (12px regular, line-height 1.5)
- `heading/caps` → Group titles (12px semibold, line-height 1.5)
- `support/label-xs` → Badge text (11px regular, line-height 1)

#### **Spacing**
- `space/1: 4` → 4px spacing
- `space/2: 8` → 8px spacing (container padding)
- `space/4: 16` → 16px spacing (right padding)
- `space/5: 24` → 24px spacing (left padding for labels/items)

#### **Layout**
- `borderRadius/static/2: 4` → Border radius (4px, but design shows 3px)

### Raw Values Needed (TODO: Map to Design System)
- Letter spacing values (0.14px, 0.6px, 0.12px)
- Border radius 3px (token shows 4px, design shows 3px)

## Technical Considerations

### Theme-UI Integration
- Continue using `sx` prop for styling
- Map design tokens to theme values where possible
- Use raw values with TODO comments for unmapped tokens

### Backward Compatibility
- Height change (25px → 32px) is a breaking change
- Ensure existing props still work
- Add new props as optional

### Performance
- Conditional rendering for different states
- Minimal re-renders
- Proper prop typing

### Accessibility
- Maintain Radix UI accessibility features
- Proper ARIA attributes for states
- Screen reader friendly icons

## Implementation Priority

1. **Phase 1**: Core component updates (Content, Item, Label, Separator)
2. **Phase 2**: State implementations (loading, empty, disabled, hover)
3. **Phase 3**: Advanced features (badges, secondary labels, selection)
4. **Phase 4**: Stories and documentation updates
5. **Phase 5**: Testing and refinement

## Testing Strategy

- [ ] Visual regression testing
- [ ] State transitions
- [ ] Accessibility testing
- [ ] Integration with existing codebase
- [ ] Performance impact assessment 