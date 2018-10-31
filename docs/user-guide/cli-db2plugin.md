# Zowe CLI plug-in for IBM Db2 Database
The Zowe CLI plug-in for IBM® Db2® Database lets you interact with Db2 for z/OS to perform tasks with modern development tools to automate typical workloads more efficiently. The plug-in also enables you to interact with Db2 to advance continuous integration to validate product quality and stability.

Zowe CLI Plug-in for IBM Db2 Database lets you execute SQL statements against a Db2 region, export a Db2 table, and call a stored procedure.The plug-in also exposes its API so that the plug-in can be used directly in other products.

  - [Use Cases](#use-cases)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Setting up profiles](#setting-up-profiles)
  - [Commands](#commands)
  
## Use cases

Use cases for Zowe CLI Db2 plug-in include:
  - Execute SQL and interact with databases.
  - Execute a file with SQL statements.
  - Export tables to a local file on your PC in SQL format.
  - Call a stored procedure and pass parameters.

## Prerequisites

Before you install the plug-in, meet the following prerequisites:

  - [Install Zowe CLI](cli-installcli.md) on your PC.
  - [Install ODBC driver on your PC](#installing-the-odbc-driver) if you install the plug-in from a package..

## Installing

There are **two methods** that you can use to install the Zowe CLI Plug-in for IBM Db2 Database - install from Bintray or install from the Zowe package.

### Installing from Bintray

If you installed Zowe CLI from **Bintray**, complete the following steps:

1. Open a command line window and issue the following command:

    ```
    zowe plugins install @brightside/db2 
    ```

2. After the command execution completes, issue the following command to validate that the installation completed successfully.

    ```
    zowe plugins validate db2
    ```

    Successful validation of the IBM Db2 plug-in returns the response: `Successfully validated`.

### Installing from package

Follow this procedure if you downloaded the Zowe installation package from **Github**.

#### Installing the ODBC driver

Install the ODBC driver and set the IBM_DB_INSTALLER_URL environment variable before you install the Db2 plug-in. 

**Follow these steps:**

1. [Download the ODBC driver](https://github.com/ibmdb/node-ibm_db#-download-clidriver-based-on-your-platform--architecture-from-the-below-ibm-hosted-url).

2. Create a new directory named `odbc_cli` on your PC.

3. Place the ODBC driver in the `odbc_cli` folder.    

4. From the command line window, set the `IBM_DB_INSTALLER_URL` environment variable by issuing the following command:

    - Windows operating systems:

      ```
      set IBM_DB_INSTALLER_URL=%cd%/odbc_cli
      ```
    - Linux and Mac operating systems:

      ```
      export IBM_DB_INSTALLER_URL=`pwd`/odbc_cli
      ```

You installed the ODBC driver successfully.

#### Installing the Plug-in

Now that the Db2 driver is installed, install the Db2 plug-in to Zowe CLI. 

**Follow these steps:**

1. Open a command line window and change the directory to the location where you extracted the `zowe-cli-bundle.zip` file. If you do not have the `zowe-cli-bundle.zip` file, see the topic **Install Zowe CLI from local package** in [Installing Zowe CLI](cli-installcli.md) for information about how to obtain and extract it.

3. Issue the following command to install the plug-in:
    ```
    zowe plugins install zowe-cli-db2-1.0.0.tgz
    ```
4. (Optional) After the command execution completes, issue the following command to validate that the installation completed successfully.

    ```
    zowe plugins validate db2
    ```

    Successful validation of the IBM Db2 plug-in returns the response: `Successfully validated`.

5. Locate your client copy of the Db2 license. For the DB2 plugin to successfully connect to a z/OS instance, you must install have a properly licensed and configured DB2 instance. 
    
    **Note:** The license must be of version 11.1 if the DB2 server is not `db2connectactivated`. You can buy a db2connect license from     IBM. The connectivity can be enabled either on server using db2connectactivate utility or on client using client side license file.
    To know more about DB2 license and purchasing cost, please contact IBM Customer Support.

6. Copy your Db2 license file and place it in the following directory. 
    
   ```
   Brightside_home>\plugins\installed\node_modules\@brightside\db2\node_modules\ibm_db\installer\clidriver\license
   ```
   
   After the license is copied, you can use the DB2 plugin functionality.

## Setting up profiles
Before you start using the IBM Db2 plug-in, create a profile.

Issue the command `-DISPLAY DDF` in the SPUFI or ask your DBA for the following information:

  - The Db2 server host name
  - The Db2 server port number
  - The database name (you can also use the location)
  - The user name
  - The password
  - If your Db2 systems use a secure connection, you can also
    provide an SSL/TSL certificate file.

To create a db2 profile in Zowe CLI, issue a command in the command shell in the following format:

```
zowe profiles create db2 <profile name> -H <host> -P <port> -d <database> -u <user> -p <password>  
```

The profile is created successfully with the following
output:

```
Profile created successfully! Path:
/home/user/.brightside/profiles/db2/<profile name>.yaml
type: db2
name: <profile name>
hostname: <host>
port: <port>
username: securely_stored
password: securely_stored
database: <database>
Review the created profile and edit if necessary using the profile update command.
```

## Commands  

The following commands can be issued with the Zowe CLI Plug-in for IBM Db2:

**Tip:** At any point, you can issue the help command `-h` to see a list of available commands.

### Calling a stored procedure

Issue the following command to call a stored procedure that returns a result set:

```
$ zowe db2 call sp "DEMOUSER.EMPBYNO('000120')"
```

Issue the following command to call a stored procedure and pass parameters:

```
$ zowe db2 call sp "DEMOUSER.SUM(40, 2, ?)" --parameters 0
```

Issue the following command to call a stored procedure and pass a placeholder buffer:

```
$ zowe db2 call sp "DEMOUSER.TIME1(?)" --parameters "....placeholder..
```

### Executing an SQL statement 

Issue the following command to count rows in the EMP table:

```
$ zowe db2 execute sql -q "SELECT COUNT(*) AS TOTAL FROM DSN81210.EMP;"
```

Issue the following command to get a department name by ID:

```
$ zowe db2 execute sql -q "SELECT DEPTNAME FROM DSN81210.DEPT WHERE DEPTNO='D01'
```

### Exporting a table in SQL format

Issue the following command to export the `PROJ` table and save the generated SQL
statements:

```
$ zowe db2 export table DSN81210.PROJ
```

Issue the following command to export the `PROJ` table and save the output to a file:

```
$ zowe db2 export table DSN81210.PROJ --outfile projects-backup.sql 
```

You can also pipe the output to gzip for on-the-fly compression.
