import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { format } from './format';

const fields = ['Log__c.Name', 'Log__c.Status__c', 'Log__c.Body__c']

export default class Logger extends LightningElement {

    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    log

    get name() {

        if (!this.log.data) { return '' }

        return this.log.data.fields.Name.value
    }

    get header() {

        if (!this.log.data) { return '' }

        return `Overall Status: ${this.log.data.fields.Status__c.value}`
    }

    get body() {
        
        if (!this.log.data) { return '' }
        
        return  format( JSON.parse(this.log.data.fields.Body__c.value) )
    }
}
// JSON.stringify(JSON.parse(this.log.data.fields.Body__c.value), null, 2)