# Pricing

In this section, all pricing information for Kubit cloud services is provided transparently and accurately. Our services are designed to accommodate diverse usage models to meet various user needs. Depending on the service type, pricing may be based on predefined plans or pay-as-you-go (PAYG).

For certain services, users must first select and purchase one of the predefined plans based on their required resources and capabilities. If your usage exceeds the limitations set in the chosen plan, additional charges will be calculated on a PAYG basis according to the same plan.

:::info[Value-Added Tax Calculation]
Please note that the value-added tax (VAT) is not included in the prices mentioned, and it will be added separately to the final invoice.
:::

## IaaS (Public Cloud)

Costs are calculated based on the amount of resources allocated to your machine. The cost details are as follows:

|         |       | Price      |
| :------ | :---- | :--------- |
| CPU     | 1 CPU | €7/Month   |
| Memory  | 1 GB  | €0.5/Month |
| Disk    | 1 GB  | €3.5/Month |
| IPv4    | -     | €1.5/Month |
| Traffic | 1 GB  | €0.035     |

## Kubchi (KaaS & PaaS)

In this service, the Kubernetes license is priced based on the resources allocated to your cluster. The pricing is calculated in a tiered manner, where the CPU and RAM costs in each cluster are taken into account. The detailed formula and pricing are provided below.

    P = 2 * CPU(vCore) + RAM(GB)

|                                      | Price      |
| :----------------------------------- | :--------- |
| Kubernetes License (0 < P < 400)     | €70/Month  |
| Kubernetes License (400 ≤ P < 2000)  | €150/Month |
| Kubernetes License (2000 ≤ P < 4000) | €300/Month |
| Kubernetes License (4000 ≤ P < 8000) | €600/Month |

## Bucket (Object Storage)

This service is billed on a PAYG basis, based on the amount of storage and traffic (upload and download) used.

|                             |      | Price        |
| :-------------------------- | :--- | :----------- |
| Storage                     | 1 GB | €0.015/Month |
| Traffic (Upload & Download) | 1 GB | €0.04        |

## SaaS (Tools)

### Sentry

- Basic Plan

|                  | Basic     | Medium    | Large      | Enterprise |
| :--------------- | :-------- | :-------- | :--------- | :--------- |
| User             | Unlimited | Unlimited | Unlimited  | Unlimited  |
| Project          | Unlimited | Unlimited | Unlimited  | Unlimited  |
| Error Monitoring | 5 K       | 100 K     | 1 M        | Custom     |
| Tracing          | 1 M       | 10 M      | 100 M      | Custom     |
| Session Replay   | 50        | 5 K       | 50 K       | Custom     |
| Attachment       | 1 GB      | 5 GB      | 50 GB      | Custom     |
| Price            | €30/Month | €80/Month | €250/Month | Negotiable |

- PAYG for Overages

|                  | Basic         | Medium        | Large        | Enterprise |
| :--------------- | :------------ | :------------ | :----------- | :--------- |
| User             | Unlimited     | Unlimited     | Unlimited    | Unlimited  |
| Project          | Unlimited     | Unlimited     | Unlimited    | Unlimited  |
| Error Monitoring | €0.4 per +1K  | €0.35 per +1k | €0.3 per +1k | Custom     |
| Tracing          | €3 per +1M    | €2.5 per +1M  | €2 per +1M   | Custom     |
| Session Replay   | €3 per +1k    | €2.5 per +1k  | €2 per +1k   | Custom     |
| Attachment       | €0.25 per +1G | €0.25 per +1G | €0.2 per +1G | Custom     |

### GitLab

|            | Basic     | Medium     | Large      | Enterprise |
| :--------- | :-------- | :--------- | :--------- | :--------- |
| User       | 5         | 15         | 50         | Custom     |
| Storage    | 20 GB     | 60 GB      | 200 GB     | Custom     |
| Limit Size | 6 GB      | 20 GB      | 100 GB     | Custom     |
| Price      | €50/Month | €120/Month | €350/Month | Negotiable |

### GitLab Runner

|                | Basic     | Medium     | Large      | Enterprise |
| :------------- | :-------- | :--------- | :--------- | :--------- |
| CPU            | 2 CPU     | 4 CPU      | 16 CPU     | Custom     |
| RAM            | 6 GB      | 12 GB      | 48 GB      | Custom     |
| DISK           | 15 GB     | 50 GB      | 200 GB     | Custom     |
| Concurrent obs | 2         | 4          | 8          | Custom     |
| Price          | €20/Month | €110/Month | €200/Month | Negotiable |

### Docker Registery

|        |      | Price        |
| :----- | :--- | :----------- |
| Storge | 1 GB | €0.015/Month |
