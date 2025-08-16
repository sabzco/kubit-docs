# Website Static

Static Website Hosting in buckets is a feature that transforms a bucket into a static website. By enabling it, you can serve HTML, CSS, and JavaScript files directly from cloud storage to users and receive a dedicated URL for your website.
![Website: bucket static website](../img/bucket-staticwebsite.png)

# Activation

:::warning[Note]
Before enabling static website hosting, ensure the following:

1. Verify that the necessary files for displaying the website have been uploaded to the bucket.
2. Ensure the [public access](../#bucket-public-access) option for the bucket is enabled.

:::

- First, navigate to the **Static Website** subpage and select the **Enable Static Website** option.
- Then, enter the values for **Source File Address** and **Error File Address**, and click **Apply Changes**.
- After activation, a dedicated **URL address** will be generated for your website, which, when accessed, will display the bucket's contents as a website.
  ![Website: sw form](../img/static-website-form.png)
  ![Website: sw config](../img/static-website-config.png)
