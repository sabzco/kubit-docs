# Monitoring System

This system is responsible for monitoring and providing the status of various systems.
In this system, first, different services must be defined, and then various types of monitors with different features can be assigned to each service.
Currently, the following monitors can be defined in the system (multiple monitors of the same type can be assigned to each service):

- URL Status Monitoring
- Monitoring a URL with options to specify Method, Username, Password, Request Headers, Request Params, and Request Body
- Ping Monitoring
- Ping Status Monitoring of a Hostname with options to specify Timeout, TTL, and Maximum Ping
- DNS Monitoring
- DNS Status Monitoring of a Hostname with options to specify DNS record type, Name Servers, and Maximum DNS response time
- SSL Certificate Monitoring
- Monitoring the status and number of days remaining until expiration for an SSL certificate of a Hostname with options to specify the maximum number of days before expiration
- Zabbix Item Monitoring
- Monitoring the status of a specific Zabbix Item

Additionally, the system allows writing descriptions for different incidents or events for a specified date in the system.
Another feature of this system is the ability to install different clients in various geographical locations to investigate and monitor the status of services from different locations.
The status of various systems is displayed in monthly charts, with different colors indicating the monitoring status at different times for the user.
The following items are considered in the future roadmap of this system, to be implemented when needed:

- Ports Monitoring
- Firewall Rules
- Database Monitoring
- Custom Agents such as Redis, Elasticsearch, etc.
- Weekly and Daily Graphs
