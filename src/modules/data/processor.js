/**
 * Enhances the data to run an experience as defined in the data module's 
 * settings.
 */
export class DataProcessor {

    /**
     * Registers all the data that will be used to enhance the
     * data.
     * 
     * @param {object} dataModuleObj - user defined settings for this data module
     * @param {object} settings - all user settings that will be enhanced.
     */
    constructor(dataModule, settings, Bus, iVXjsLog) {

        /**
         * User defined data module data that will be used to
         * process and enhance the experience data.
         * 
         * @type {object}
         */
        this.dataModule = dataModule;

        /**
         * All user settings including default data that will 
         * be added to this data module. 
         * 
         * @type {object}
         */
        this.settings = settings;

        /**
         * All available data modules that can be set for this
         * experience.
         * 
         * @type {object}
         */
        this.Bus = Bus;
        this.iVXjsLog = iVXjsLog
    }

    /**
     * Loads dependencies needed to run the enhancements on the data 
     * and resolves by sending out all enhanced data.
     * 
     * @return {Promise} - indicates that the data is enhanced.
     */
    getData() {
        let self = this;
        let {dataModule, settings} = this;
        let {data : dataSettings} = settings;
        let dataPromise = new Promise((resolve, reject) => {
            self.runEnhancements(resolve, reject, dataModule, dataSettings, self.settings);        
        });

        return dataPromise;
    }

    /**
     * Utilizing the appropriate module defined in the data module settings
     * this will enhance the current data and actions defined in that 
     * class's enhance method.
     */
    runEnhancements(resolve, reject, DataModuleClass, dataModuleSettings, iVXjsSettings) {
        let dataModule = new DataModuleClass(dataModuleSettings, iVXjsSettings, this.Bus, this.iVXjsLog);
        
        dataModule
            .enhance()
            .then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            })
    }
};