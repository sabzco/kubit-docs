# Prerequisite Concepts

## CDN

**CDN (Content Delivery Network)** was developed as a solution to address latency in loading, traffic congestion, and scalability issues. With the expansion of the internet and the increase in users across different geographical locations, delivering content from a single central server caused delays and user dissatisfaction. A CDN places **cache nodes**, known as **PoPs (Points of Presence)**, in strategic locations to deliver content such as images, videos, JS, and CSS from the **closest location to the user**, thereby increasing load speed, reducing the burden on the origin server, and improving resistance against attacks like DDoS. Google and other search engines consider **site speed** and **maintaining site availability during high traffic or DDoS attacks** as critical ranking factors; thus, a CDN not only enhances load speed but also directly impacts **SEO**. A CDN is a response to the global need for **fast**, **stable**, and **secure** digital content delivery.

### Caching

In the context of computing and information technology, a cache refers to **high-speed access memory**. Caching is the **process of temporarily storing data** in this memory to avoid reloading it from the original source in subsequent requests. In a **CDN**, **caching** involves **storing static files** (such as images, CSS, and JavaScript files) and **even some dynamic files** on servers close to the user. This technique results in **reduced response time**, **lower load on the origin server**, and an **improved user experience**.

### Edge Server and Host Server

**Edge Servers** are servers located at the edge of the network, close to the geographical location of users. These servers play a critical role in CDN architecture by **storing cached content** and delivering it quickly to users. In contrast, the **UpStream**, **Origin Server**, or **Host Server** is the central server where the complete and up-to-date website content is stored. When a user requests content that is not available or has expired on the edge server, the request is forwarded to the origin server.

### CDN Rules and Settings

A CDN relies on a **set of rules and settings** to effectively manage caching and server responses. These rules include determining which paths should or should not be cached, the duration files are stored (TTL: Time To Live), checking HTTP headers like Cache-Control and ETag, and defining strategies such as cache purge or cache invalidation. Properly configuring these policies by the technical team plays a key role in achieving optimal CDN performance, keeping content fresh, and minimizing content display errors.

### Load Balancing

Load balancing in a CDN refers to distributing user requests across multiple servers to prevent overloading a single server. This enhances stability, availability, and service speed, especially during high website traffic.

### DDoS Protection

CDNs can play a critical role in **preventing DDoS attacks**. By **distributing traffic** and **filtering suspicious requests** at network edge points, they protect the origin server from massive attacks and maintain website performance stability.

### SEO Optimization

CDNs indirectly contribute to SEO improvement. By reducing page load times, they enhance the user experience, a key factor in Google’s ranking algorithm. Proper use of CDNs and appropriate cache and URL settings ensure that cached content remains synchronized with the original, preventing confusion for search engine crawlers.

## DNS

The **Domain Name System (DNS)** acts like the **internet’s phonebook**. Without DNS, users would need to memorize complex numerical addresses. **Users** access sites using **domain names** like `nytimes.com`, but **browsers** require **IP addresses** to connect. **DNS translates these domain names into IP addresses**, enabling internet resources to load.

Every device connected to the internet has a **unique IP address** that other devices use to locate it. DNS simplifies this process for humans, eliminating the need to memorize complex numerical addresses like `192.168.1.1` (in IPv4) or `2400:cb00:2048:1::c629:d7a2` (in IPv6).

### DNS Records

DNS records are a set of settings that determine how your domain functions, such as where emails are routed (MX Record) or which server hosts the main site (A Record). With proper configuration, you gain full control over incoming traffic routing.

### Anycast

With Anycast infrastructure technology, DNS requests are answered by the closest server, with responses sent from the nearest geographical point. This technology significantly reduces latency, improves user experience, and enhances site stability. Kubit’s DNS service leverages Anycast infrastructure by default to ensure your site is stable, fast, reliable, and accessible from anywhere in the world.

### Propagation

When you change DNS settings, these changes must be distributed or propagated across DNS servers, a process known as propagation. In many services, this can take hours, but with Kubit’s fast and up-to-date infrastructure, DNS record changes are propagated across servers with minimal delay. This means quicker responses to changes without losing visitors or traffic to your site.

### TTL (Time to Live)

TTL determines how long a DNS record remains in the cache of browsers and DNS servers. A lower TTL means faster updates and better alignment with changes.
