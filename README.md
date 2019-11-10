# Logger

Simple logs that can be created by outside systems that connect to Salesforce or by Salesforce itself -- includes an LWC easy viewing of log Body containing JSON 🦄

## todo thoughts
Get Custom Tab, misc metadata, etc for 1 shot deploying
Add package w/ sfdx scripts
Test full deploy to bare org + document / add needed metadata
Can't think of much on permission basis but typically only sys admins would need this so meh
Clean up + add more better examples

## Examples

```java
Log__c log = new Log__c(
    Status__c = 'Development',
    Body__c = '"RESULTS": "[ { "RAN": false, "TEST": true } ]"'
);

insert log;
```

```JS
jsforce.sobject( 'Log__c' ).insert({
  Status__c: 'Success',
  Body__c: JSON.stringify( { RESULTS: Log.results } )
},
  callback()
)
```
