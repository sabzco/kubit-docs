# Pricing

In this section, all pricing information for Kubit cloud services is provided transparently and accurately. Our services are designed to accommodate diverse usage models to meet various user needs. Depending on the service type, pricing may be based on predefined plans or pay-as-you-go (PAYG).

For certain services, users must first select and purchase one of the predefined plans based on their required resources and capabilities. If your usage exceeds the limitations set in the chosen plan, additional charges will be calculated on a PAYG basis according to the same plan.

:::info[Value-Added Tax Calculation]
Please note that a 10% value-added tax will be added to the costs stated in this document.
:::

## IaaS (Private Cloud)

Costs are calculated based on the amount of resources allocated to your machine. The cost details are as follows:

|         |        | Price      |
| ------- | ------ | :--------- |
| CPU     | ‎1 CPU | $7/month   |
| Memory  | ‎1 GB  | $0.5/month |
| Disk    | ‎1 GB  | $3.5/month |
| IPv4    | -      | $1.5/month |
| Traffic | ‎1 GB  | $0.035/g   |

## Kubchi (KaaS & PaaS)

In this service, the Kubernetes license is priced based on the resources allocated to your cluster. The pricing is calculated in a tiered manner, where the CPU and RAM costs in each cluster are taken into account. The detailed formula and pricing are provided below.

    P = 2 * CPU(vCore) + RAM(GB)

|                                       | Price |
| ------------------------------------- | :---- |
| Kubernetes License ‎(0 < P < 400)     | $70   |
| Kubernetes License ‎(400 ≤ P < 2000)  | $150  |
| Kubernetes License ‎(2000 ≤ P < 4000) | $300  |
| Kubernetes License ‎(4000 ≤ P < 8000) | $600  |

## Bucket (Object Storage)

This service is billed on a PAYG basis, based on the amount of storage and traffic (upload and download) used.

|                             |       | Price    |
| --------------------------- | :---- | :------- |
| Storage                     | ‎1 GB | $0.015/g |
| Traffic (Upload & Download) | ‎1 GB | $0.04/g  |

## SaaS (Tools)

### Sentry

- Basic Plan

|                  | Basic     | متوسط     | بزرگ       | Enterprise |
| :--------------- | :-------- | :-------- | :--------- | :--------- |
| User             | Unlimited | Unlimited | Unlimited  | Unlimited  |
| Project          | Unlimited | Unlimited | Unlimited  | Unlimited  |
| Error Monitoring | ‎5 K      | ‎100 K    | ‎1 M       | Negotiable |
| Tracing          | ‎1 M      | ‎10 M     | ‎100 M     | Negotiable |
| Session Replay   | 50        | ‎5 K      | ‎50 K      | Negotiable |
| Attachment       | ‎1 GB     | ‎5 GB     | ‎50 GB     | Negotiable |
| Price            | $30/month | $80/month | $250/month | Negotiable |

- PAYG for Overages

|                  | پایه          | متوسط         | بزرگ         | سازمانی    |
| :--------------- | :------------ | :------------ | :----------- | :--------- |
| User             | Unlimited     | Unlimited     | Unlimited    | Unlimited  |
| Project          | Unlimited     | Unlimited     | Unlimited    | Unlimited  |
| Error Monitoring | +1K for $0.4  | +1k for $0.35 | +1k for $0.3 | Negotiable |
| Tracing          | +1M for $3    | +1M for $2.5  | +1M for $2   | Negotiable |
| Session Replay   | +1k for $3    | +1k for $2.5  | +1k for $2   | Negotiable |
| Attachment       | +1G for $0.25 | +1G for $0.25 | +1G for $0.2 | Negotiable |

## Gitlab

|            | پایه      | متوسط      | بزرگ       | سازمانی    |
| :--------- | :-------- | :--------- | :--------- | :--------- |
| User       | 5         | 15         | 50         | Negotiable |
| Storage    | ‎20 GB    | ‎60 GB     | ‎200 GB    | Negotiable |
| Limit Size | ‎6 GB     | ‎20 GB     | ‎100 GB    | Negotiable |
| Price      | $50/month | $120/month | $350/month | Negotiable |

## Gitlab Runner

|                | پایه   | متوسط  | بزرگ    | سازمانی    |
| :------------- | :----- | :----- | :------ | :--------- |
| CPU            | ‎2 CPU | ‎4 CPU | ‎16 CPU | Negotiable |
| RAM            | ‎6 GB  | ‎12 GB | ‎48 GB  | Negotiable |
| DISK           | ‎15 GB | ‎50 GB | ‎200 GB | Negotiable |
| Concurrent obs | 2      | 4      | 8       | Negotiable |
| Price          | $20    | $110   | $200    | Negotiable |

## Docker Registery

|        |       | قیمت     |
| :----- | :---- | :------- |
| Storge | ‎1 GB | $0.015/g |
