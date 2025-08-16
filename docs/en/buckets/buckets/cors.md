# CORS Settings

CORS (Cross-Origin Resource Sharing) settings allow you to manage requests from external sources (other domains) to your bucket.

![CORS: bucket cors](../img/bucket-cors.png)

On the CORS settings page, a list of **defined rules** is provided, along with options to **define a new rule**, **edit**, and **delete**.  
In the list of rules, information such as the **name** of the rule and values like **Allowed Origins**, **Allowed Methods**, **AllowedHeaders**, and more, which are set for the rule, are displayed.  
By clicking on each **name**, you will be directed to the **details** page of that rule.
![CORS: list](../img/cors-list.png)

## Defining a CORS Rule {#cors-example}

To configure CORS rules, you need to understand several key elements, for which you specify values as settings. These values determine how and from where access to resources is permitted. The settings include the following fields:

- **Rule Name (Required)**: A valid and unique name chosen to identify the CORS rule.
- **AllowedHeaders**: A list of HTTP headers that can be sent with the request. These headers inform the server which additional data (such as tokens or formats) is acceptable, e.g., `Content-Type`, `Authorization`, etc.
- **AllowedMethods**: A list of HTTP methods (e.g., `GET`, `POST`, `PUT`, `DELETE`, `HEAD`) that the browser is allowed to use for requests to the server. These methods specify which types of requests are permitted.
- **AllowedOrigins (Required)**: The URLs of domains that are allowed to access the resources. This field ensures that requests are only accepted from the specified addresses.
- **ExposeHeaders**: Specific headers that the browser is allowed to view in the response. This allows the browser to access headers that may not be available by default.

To define a new rule, click the **Define New Rule** button to be directed to the **New Rule** subpage. A form containing the required information for creating the rule (as described above) will be displayed.
![CORS: new cors btn](../img/new-cors-page.png)
![CORS: new cors form](../img/new-cors-form.png)

### Editing

- To edit a rule, click the three-dot button in the operations column of the desired rule.
- Then, click the **Edit Rule** option to be directed to the edit form.
- Make the necessary changes and click **Update Rule**.
  ![CORS: edit btn](../img/edit-cors.png)
  ![CORS: edit form](../img/edit-cors-form.png)

### Deleting

- To delete a rule, click the three-dot button in the operations column of the desired rule.
- Then, click the **Delete Rule** option.
  ![CORS: delete btn](../img/delete-cors.png)
