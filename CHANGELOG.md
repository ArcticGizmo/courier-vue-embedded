# 6.2.1

- upgraded to courier v6.2.1
- Inbox `views` now default to messages only. If you would like to include preferences please register it as a view
  `<CourierInboxVue :views="[{id: 'message', label: 'Messages'}, { id: 'preferences', label: 'Preferences' }]" />`
- When setting your own `window.courierConfig` values, please ensure that `{initOnLoad: false}` is also set as this
  wrapper does not support syncronous initialisation
- fixed v-model not working correctly for inbox open property

# 4.11.0

- upgrade to courier v4.11.2
- ⚠ Removed support for vue 2 ⚠
- complete re-write to support useCourier semantics
- changed CDN for source to `components.courier.com`
- added preferences to `window`

# 4.5.0

- upgrade to courier v4.5.0
- added support for `appendTo` to append inbox anywhere
- added missing inbox support for `defaultIcon`, `isOpen`, `onEvent`, `openLinksInNewTab` and `showUnreadMessageCount`
- fixed props not syncing via component properties

# 4.4.1

- added support for bundler imports

# 4.4.0

- upgrade to courier v4.4.0
- Added support for `scrollTop` labels
- various dependency upgrades

# 4.3.2

- upgrade to courier v4.3.2
- fixed reconnect losing tenantId

# 4.3.0

- 🎉 moved version in line with courier react package (makes more sense now)
- upgraded to courier v4.3.0
- added support for brand "renderActionsAsButtons"
- added support for inbox "renderActionsAsButtons"

# 2.0.0

- upgraded to courier v4.2.5
- added `tenantId` to config, inbox and preferences
- [Chore] Dependency upgrades

# 1.2.0

- updated to version 3.6.2

# 1.1.1

- fixed false component registering on vue 2.7
- added workaround note to remove unregistered custom components in vue 2.7

# 1.1.0

- added support for vue 2.7 (via vue-demi)
- converted components from SFC to ts

# 1.0.0

- support for v3 api
- extended props for all components
- added `CourierPreferencesVue` component
- removed overflow styling
