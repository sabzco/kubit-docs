# Alerting

This Helm chart is designed to help configure alerting system, AlertManager for now.

It consists of several sections.

| Sections                            | Description                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`route`](#route)                   | Alertmanager route definition which will be added to the generated Alertmanager configuration as a first-level route. |
| [`receivers`](#receivers)           | Receiver defines one or more notification integrations                                                                |
| [`inhibitRules`](#inhibitrules)     | Inhibit rules used to silent relevant alerts (#FIXME: not ready yet)                                                  |
| [`prometheusRule`](#prometheusrule) | Simplifies creating PrometheusRules resources                                                                         |

## TL;DR, How to use this chart?

Simple example

```yaml
route:
  routes:
    - receiver: chat
      matchers:
        - name: namespace
          value: prod-.+

receivers:
  chat:
    webhookConfigs:
      - url: https://chat.example.com/hooks/XC6ptt3jceSeu4NJC/7KWt5iKYYegxPHchTfX6uyzmJ8wKnGkWEp8TWAeiN3DmAKqa
        sendResolved: true
```

---

## Route

Alertmanager route definition which will be added to the generated Alertmanager configuration as a first-level route.

| Parameter          | Type                    | Description                                                                                                                | Default |
| ------------------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------- |
| `receiver`         | string                  | (Required) Name of the receiver for this route. If not empty, it should be listed in the `receivers` section.              | --      |
| `continue`         | boolean                 | Boolean indicating whether an alert should continue matching subsequent sibling nodes                                      | `false` |
| `groupBy`          | list of strings         | List of labels to group by                                                                                                 |         |
| `groupInterval`    | string                  | How long to wait before sending an updated notification. Must match `[0-9]+(ms\s\m\h)`                                     |         |
| `groupWait`        | string                  | How long to wait before sending the initial notification. Must match `[0-9]+(ms\s\m\h)`                                    |         |
| `matchers`         | list                    | List of matchers that the alert’s labels should match.                                                                     |         |
| `matchers[].name`  | string                  | Label to match                                                                                                             |         |
| `matchers[].value` | string                  | Label value to match                                                                                                       |         |
| `matchers[].regex` | boolean                 | Whether to match on equality (false) or regular-expression (true)                                                          | `false` |
| `matchLabels`      | mapping                 | Mapping of label:value to add to matchers, It will be treated as regex matcher if have characters other than `A-Za-z0-9_-` |         |
| `repeatInterval`   | string                  | How long to wait before repeating the last notification. Must match the regular expression `[0-9]+(ms\s\m\h)`              |         |
| `routes`           | list of [route](#route) | Child routes                                                                                                               |         |

---

## Receivers

Receiver defines one or more notification integrations. it is a list if items with following properties.

| Parameter        | Type                                      | Description                    | Default |
| ---------------- | ----------------------------------------- | ------------------------------ | ------- |
| `name`           | string                                    | (Required) Receiver name       |         |
| `emailConfigs`   | list of [emailConfigs](#emailconfigs)     | List of Email configurations   |         |
| `slackConfigs`   | list of [slackConfigs](#slackconfigs)     | List of Slack configurations   |         |
| `webhookConfigs` | list of [webhookConfigs](#webhookconfigs) | List of webhook configurations |         |

---

### emailConfigs

Receiver Email configurations

**#FIXME:** complete the table

| Parameter    | Type   | Description | Default |
| ------------ | ------ | ----------- | ------- |
| authIdentity | string |             |         |
| authPassword | object |             |         |
| authSecret   | object |             |         |
| authUsername | string |             |         |
| from         | string |             |         |
| headers      | list   |             |         |
| hello        | string |             |         |
| html         | string |             |         |
| requireTLS   | string |             |         |
| sendResolved | string |             |         |
| smarthost    | string |             |         |
| text         | string |             |         |
| tlsConfig    | object |             |         |
| to           | string |             |         |

---

### slackConfigs

Receiver Slack configurations

**#FIXME:** complete the table

| Parameter    | Type | Description | Default |
| ------------ | ---- | ----------- | ------- |
| actions      |      |             |         |
| apiURL       |      |             |         |
| callbackId   |      |             |         |
| channel      |      |             |         |
| color        |      |             |         |
| fallback     |      |             |         |
| fields       |      |             |         |
| footer       |      |             |         |
| httpConfig   |      |             |         |
| iconEmoji    |      |             |         |
| iconURL      |      |             |         |
| imageURL     |      |             |         |
| linkNames    |      |             |         |
| mrkdwnIn     |      |             |         |
| pretext      |      |             |         |
| sendResolved |      |             |         |
| shortFields  |      |             |         |
| text         |      |             |         |
| thumbURL     |      |             |         |
| title        |      |             |         |
| titleLink    |      |             |         |
| username     |      |             |         |

---

### webhookConfigs

Receiver Webhook configurations

**#FIXME:** complete the table

| Parameter    | Type | Description | Default |
| ------------ | ---- | ----------- | ------- |
| httpConfig   |      |             |         |
| maxAlerts    |      |             |         |
| sendResolved |      |             |         |
| url          |      |             |         |
| urlSecret    |      |             |         |

---

## inhibitRules

List of inhibition rules. (The rules will only apply to alerts matching the resource’s namespace.)?

| Parameter             | Type    | Description                                                                                                                     | Default |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `equal`               | string  | Labels that must have an equal value in the source and target alert for the inhibition to take effect.                          |         |
| `sourceMatch`         | list    | Matchers for which one or more alerts have to exist for the inhibition to take effect                                           |         |
| `sourceMatch[].name`  | string  | Label to match                                                                                                                  |         |
| `sourceMatch[].value` | string  | Label value to match                                                                                                            |         |
| `sourceMatch[].regex` | boolean | Whether to match on equality (false) or regular-expression (true)                                                               | `false` |
| `sourceMatchLabels`   | mapping | Mapping of label:value to add to `sourceMatch`, It will be treated as regex matcher if have characters other than `A-Za-z0-9_-` |         |
| `targetMatch`         | list    | Matchers that have to be fulfilled in the alerts to be muted.                                                                   |         |
| `targetMatch[].name`  | string  | Label to match                                                                                                                  |         |
| `targetMatch[].value` | string  | Label value to match                                                                                                            |         |
| `targetMatch[].regex` | boolean | Whether to match on equality (false) or regular-expression (true)                                                               | `false` |
| `targetMatchLabels`   | mapping | Mapping of label:value to add to `targetMatch`, It will be treated as regex matcher if have characters other than `A-Za-z0-9_-` |         |

---

### PrometheusRule

**Section**: `prometheusRule`

**#FIXME: incomplete contents**

| Parameter           | Type              | Description                                                                                     | Default |
| ------------------- | ----------------- | ----------------------------------------------------------------------------------------------- | ------- |
| `enabled`           | boolean           | Enables this `prometheusrule`                                                                   | `true`  |
| `tpl`               | string            | Treat rules as helm template                                                                    | `false` |
| `interval`          | positive integer  | Interval between each time `prometheusRule.rules` are run                                       | --      |
| `grafanaDomain`     | string            | grafana domain for connection from prometheus to grafana                                        | --      |
| `rules`             | list              | Prometheus Rules                                                                                | --      |
| `rules.expr`        | integer or string | (Required) The expression to be run #FIXME                                                      | --      |
| `rules.record`      | string            | Record name to save expr result                                                                 | --      |
| `rules.for`         | string            | How long to wait before raising the alert. Must match the regular expression `[0-9]+(ms\s\m\h)` | --      |
| `rules.labels`      | mappings          | Labels for this rule                                                                            | --      |
| `rules.annotations` | mappings          | Annotations for this rule                                                                       | --      |

---

_last update: 2022-01-24_
