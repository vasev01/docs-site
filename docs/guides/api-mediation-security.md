Zowe API Mediation Layer Security
=================================

The security of the APIML is done on several levels. They are described in following sections.

Transport-level Security
------------------------

The data need to be secured during transport this is achieved by using TLS protocol for all connections to APIML services. While it is allowed to disable it (e.g. for debugging purposes), the default mode is to have in on.

Authentication
--------------

Authentication is a way how an entity - a user or an application (API Client or API Service) can prove that they are what they claim to be.

The APIML is using to authentication methods:
- user ID and password (and authentication tokes retrieved by using user ID and password) 
    - requests originate from a user
    - user ID and password are validated by z/OS security manager and then the token is used to access the API service
- TLS client certificates - for service-only requests

In the future, we would like APIML to support client certificates to access the gateway.

Authorization
-------------

Authorization is a method how access rights of an entity are determined.

In the APIML, the authorization is done by z/OS security manager ([CA ACF2](https://www.ca.com/us/products/ca-acf2.html), [IBM RACF](https://www.ibm.com/support/knowledgecenter/zosbasics/com.ibm.zos.zsecurity/zsecc_042.htm), [CA Top Secret](https://www.ca.com/us/products/ca-top-secret.html)). The authentication token is used as a proof of a valid authentication but authorization checks are always done by the z/OS security manager.


Types of services
-----------------

- Zowe APIML services:
  
    - Gateway Service (GW)
        - The gateway is the access point for API clients that need to access API services
        - API Services can be accessed via the gateway by API Clients
        - Gateway gets information about API Service from Discovery Service
    
    - Discovery Service (DS)
        - The discovery service collects information about API Services and provides it to GW and other services
        - API Mediation services are registered to it too
    
    - API Catalog (AC)
        - Displays information about API services in a web UI
        - Gets information about API Service from Discovery Service

    - Authentication and Authorization Service (AAS) 
        - Provides authentication and authorization functionality to check access of users to resources on z/OS
        - Security service is not provided as an individual microservice but is included to the Gateway Service
        - More details are on in [APIML wiki](https://github.com/gizafoundation/api-layer/wiki/Zowe-Authentication-and-Authorization-Service)

- API Clients
    - API Clients are external applications, users, or other API services that are accessing the API services via the GW
  
- API Services 
    - API Services are applications that want to be accessed via the gateway
    - They register themselves to the DS
    - API Services can always access other services via GW
    - API Services can sometimes access other services without GW (in case that they are installed in such way that direct access is possible)
    - API Services can be API Clients to (when they access other services)

Following diagram show basic relationships between services:
![Services Diagram](../images/api-mediation/apiml-components.svg)


Transport Security Requirements
-------------------------------

All the servers need to provide HTTPS ports.

The requirements for the services are following:

- API Client
    - Is not a server
    - Needs to trust GW
    - Has a trust store that contains certificate(s) needed to trust GW

- Gateway Service
    - Provides HTTPS port
    - Has a key store with the server certificate
        - The certificate needs to be trusted by API Clients
        - This certificate should be trusted by web browsers because GW be used to display web UIs
    - Has a trust store that contains certificates needed to trust API Services

- API Catalog
    - Provides HTTPS port
    - Has a key store with the server certificate
        - The certificate needs to be trusted by GW
        - This certificate does not need to be trusted by anyone else

- Discovery Service
    - Provides HTTPS port
    - Has a key store with the server certificate
        - The certificate needs to be trusted by API Clients
    - Has a trust store that contains certificates needed to trust API Services

- API Service
    - Provides HTTPS port
    - Has a key store with the server and client certificate
        - The server certificate needs to be trusted by GW
        - The client certificate needs to be trusted by DS
        - The client and server certificates can be the same
        - These certificates do not need to be trusted by anyone else
    - Has a trust store that contains certificate(s) needed to trust GW and DS
  

Authentication
--------------

- API Gateway

    - API gateway does not handle authentication right now - requests are sent to the API services who need to handle authentication

- API Catalog

    - API catalog is accessed by users and it needs to be protected by a login
    - This is done via Authentication and Authorization Service

- Discovery Service

    - DS is accessed by API Services
    - This access (reading information and registration) needs to be protected by client certificate
    - Access can be allowed to users (administrators) - optional

- API Services

    - It is up to the service
    - It should be using Authentication and Authorization Service for authentication


Trust stores and key stores
---------------------------

A _key store_ is a repository of security certificates - either authorization certificates or public key certificates - plus corresponding private keys, used in TLS encryption. It can be stored in Java specific format (JKS) or use the standard format (PKCS12). The Zowe APIML is using PKCS12 so the key stores can be used
by other technologies used in Zowe (Node.js).

The APIML local CA:

- Contains local CA certificate and its private key (needs to be store securely)
- It is used to sign certificates of services
- Its certificate is trusted by API services and clients

The APIML key store:

- server certificate of GW (with PK) - can be signed by local CA or external CA
- server certificate of DS (with PK) - can be signed by local CA
- server certificate of AC (with PK) - can be signed by local CA
- used by APIML services

The APIML trust store:

- contains local CA public certificate
- contains external CA public certificate (optional)
- can contain self-signed certificates of API Services that are not signed by local or external CA
- used by APIML services

API service key store (for each service)

- contains server and client certificate signed by local CA
  
API service trust store (for each service)  

- contains local CA and external CA certificates (optional)


Client Certificate
------------------

A client certificate is a certificate that is used for validation of the HTTPS client.

The client certificate of a Eureka client can be the same certificate as the server certificate of the services which the Eureka client.


Certificate Management in Zowe API Mediation Layer
==================================================

How to start APIML on localhost with full HTTPS
-----------------------------------------------

The `api-layer` repository already contains pre-generated certificates that can be used to start APIML with HTTPS on your computer. The certificates are not trusted by your browser so can either ignore security warning or generate your own certificates and add them to the trust store of your browser or system.

The certificates are described in more detail in the `api-layer` repository.

Generating own certificates for localhost
-----------------------------------------



1. Zowe Developer (Zoe) wants to start development system on a workstation (localhost) with HTTPS with APIML services (https://github.com/gizafoundation/api-layer/issues/194)
    
    1. Using pre-generated certificates in the source code for APIML on localhost (pre-generated using local CA)
    2. By generating certificates on the workstation (localhost) - using local CA

2. Zowe Developer wants to register a new service to APIML development system on the workstation (https://github.com/gizafoundation/api-layer/issues/194)

    1. Using a pre-generated certificate for a new service on localhost
    2. By generating a new service certificate signed by certificate created in _1.2._

3. Zowe Developer want to create a test system on a mainframe (https://github.com/gizafoundation/api-layer/issues/195)

    1. By generating certificates on z/OS using local CA in key stores (PKCS12)

4. Zowe Developer wants to add a new service to a test system on a mainframe (https://github.com/gizafoundation/api-layer/issues/195)

    1. By generating a new service certificate signed by certificate created in _3.1._ and stored in the application key store

5. System programmer (Sherman) wants to create an instance of APIML on a mainframe 

    1. By generating certificates on z/OS using local CA in key stores (PKCS12)
    2. By generating certificates on z/OS using local CA in SAF keyrings (CA-only)

6. System programmer wants to add a new service to the APIML on a mainframe (CA-only)

    1. By generating a new service certificate signed by certificate created in _5.1._ and storing it in the application key store
    2. By generating a new service certificate signed by certificate created in _5.2._ and storing it in the application keyring
    3. By importing existing service certificate to the APIML trust store

7. API Client Developer (Michelle) wants to connect to API gateway securely

    1. From web browser - by importing the APIML CA certificate into the web browser
    2. From Java, Node.js and other programmatic clients - by adding the APIML CA certificate(s) to the key store

8. API Service Developer (Sudeep) want to make the service registerable to APIML by Sherman

9. API Service Developer (Sudeep) want to register the test version of the service to the APIML test system  


The APIML local CA - the local CA that is created for APIML purposes only
external CA trusted by APIML - the external CA (external to APIML, usually internal CA in the company) which root certificate (sometimes even intermediate certificates) is trusted by the APIML

APIML CA certificate(s) - the certificates that are needed to trust the APIML services (gateway, discovery service). It can be a local CA certificate or external CA root certificate in case of an external CA 
and sometimes intermediate external CA certificates (if this CA does not add intermediate to signed certificates).


What is missing in the current version
----------------------------------

1. Documented and automated process how to create local CA and create APIML
   - Working on localhost and during the installation
        - On localhost (for Zowe developer), there are pre-generated certificates and developer can generate them again via a script
        - In Zowe installation, the same script is used to generate the certificates
        - The scripts should be written as a shell script that works on z/OS, Mac, Linux, and Windows (e.g. Java or bash)   

   - Documented process how the externally signed certificate can be used

2. Documented and automated process how to add a new service to the APIML

3. HTTPS to access DS

4. Authentication to access DS - client certificates
    - Affects enablers

5. Sample service - allow HTTPS connection to DS (CA-only)

6. z/OS keyrings (CA-only)

    - Job to create keyrings for local CA and the APIML
    - Job to create a certificate for a new service and add it its keyring
    - Job to import a certificate to APIML keyring for the trust

7. Provide externally signed GW certificate (after GA)
   

Stories
-------

1. Certificate management

    1. CM Script for a developer to be used on localhost
    2. CM Script is used in Zowe installation
    3. CM Script is used in CA installation

2. Discovery Service HTTPS
   
    1. Configuration cleanup - DS, GW
    2. Java code
        - Possibility to switch it off (fallback to HTTP and `eureka:password`)
    3. Internal components use HTTPS to access DS
    4. Script to generate certificates for Zowe (during installation)
    5. Zowe configuration
    6. CA configuration

3. Enablers HTTPS
   
    1. Java code update to use key and trust store for access to DS (CA)
    2. Instructions for teams what needs to be added to the configuration
    3. Generic instructions for customers that are added to product documentation

4. API Catalog HTTPS
    1. Configuration cleanup
    2. API catalog is using HTTPS to access it (same cert. as API GW, on by default) 

5. Discoverable Client HTTPS
    1. Configuration cleanup
    2. Same as API Catalog HTTPS 

Links:
  - https://dzone.com/articles/secure-discovery-with-spring-cloud-netflix-eureka
  - https://github-isl-01.ca.com/MFaaS/ProVisionM/blob/da3e650648e5fd35f277dc429a46fc96ad90418b/API_ML/scripts/CertMgmt.sh
