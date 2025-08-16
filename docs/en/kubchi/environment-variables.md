# Environment Variables

## Reuse Logic in the Kubit System

The **Kubchi** service enables centralized definition and reuse of values to enhance efficiency, reduce errors, and simplify system maintenance. One of the primary tools for this is **Environment Variables**, which can be used across multiple modules or services.

To this end, Kubit provides the ability to define two types of variables, categorized based on user needs as follows:

### Kubit Variables

Variables that are defined once in the system and can be used across multiple programs, scripts, or modules, even if the variable names differ in each program.

These variables are useful when multiple programs require the same value but use different names for it.

**Example:**

Suppose you have two programs that use the same value, such as a database address. In the first program, this value is named `SPRING_DATASOURCE_URL` (in Java applications), and in the second program, it is named `DATABASE_HOST` or `DB_HOST` (in Python Django applications).  
In this case, you can define this value as a Kubit variable in Kubit and use it in the [configuration](../config) of both programs.

### Group Variables

A set of variables defined similarly to Kubernetes configurations (such as `ConfigMap` or `Secret`). These are typically used for sharing a common set of information across multiple microservices.

Group variables are used to configure multiple variables (e.g., username, password, database address, etc.) simultaneously across several services.

**Example:**

Suppose you have multiple microservices that all connect to the same database. You can define a variable group named `db_config` that includes `DB_HOST`, `DB_USER`, and `DB_PASS`. Then, apply this group to all services (via the [configuration](../config) file).
