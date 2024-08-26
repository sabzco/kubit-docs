# Rasan (Messaging Center)

## Introduction

This system is responsible for central messaging and provides various APIs for sending messages (such as sending messages to a number, a user, or a group connected to the central authentication system). In this system, it is possible to define different messaging accounts such as Qasedak, Kavehnegaar, etc. Subsequently, various keys can be defined for using different messaging accounts.

Additionally, to accommodate different uses and specify access levels, various services can be introduced into this system, and specific accounts can be allocated for each of the services. Users with defined access levels can also be added to any service. Furthermore, it is possible to generate time-limited tokens for each service so that each service can send messages from various messaging accounts to any required user based on its needs.

There is also the capability to send group messages to a specific group or a list of contacts for each service in the system. The ability to send messages in this system is provided both in the panel and through API calls. Advanced search is anticipated across all modules of the system, especially for messages. Additionally, logs of all system operations and API logs are stored and can be reviewed and searched. In the dashboard of each service, it is possible to view a chart of messages sent in the last 7 days, a list of the most recent messages sent, and a list of allowed sending methods for each service. The documentation for the messaging center APIs is also user-friendly and accessible. Other features of this system include user management, group management, switching between different user services, bilingual support, and the status of review and follow-up for each message.

Currently, only SMS services are supported by this system; however, the infrastructure for implementing and using other messaging methods such as email and notifications is also provided in this system, and various sending methods can be integrated in the future.

## Features of the System

- User management
- Group management
- Definition and management of message sending accounts
- Periodic updating of account balance and expiration date for message sending accounts
- Automatic alerts for specified mobile numbers when approaching the end of account balance
- Automatic alerts for specified mobile numbers when nearing the expiration date of the account
- Manual updating of account balance and expiration date for message sending accounts
- Ability to send test messages to check the status of the account
- Management of sending methods
- Service management
- Management of API tokens
- Definition and management of user access levels
- Sending messages through the panel
- Sending messages via API
- Checking message status via API
- Viewing, reviewing, and searching the list of messages
- Ability to define a contact list
- Sending group messages to a specific group or contact list
- Viewing logs of all system operations
- Viewing logs of all invoked APIs
- Chart of messages sent in the last 7 days on the dashboard
- Viewing the most recent messages sent on the dashboard
- Viewing allowed sending methods for each service
