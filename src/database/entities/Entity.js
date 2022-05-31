/**
 * When retrieving information from the database, it is often useful to separate/hide
 * the table names from the rest of the application. In order to do this, an
 * intermediate form that contains all the relevant information coupled to keys with
 * different names to those found in the database has to be used. Entities represent
 * factories for such intermediate forms.
 * 
 * An Entity can be used to convert a database query result into a JSON that can then
 * be used elsewhere in the application without direct exposure or dependency to the
 * database. Each entity will implement its own 'form'-method that carries out the 
 * conversion. By default, the 'model'-property stores the database column names
 * coupled with the JSON keys. The 'form'-method will simply match the given database
 * query result columns with the 'model' keys and place the corresponding value to
 * the generated JSON, though this method can be overridden for more complex
 * conversion.
 */
export default class Entity {
    constructor() {
        this.model = null;
    }

    /**
     * Sets the model coupling a database query column name with a name of a key
     * found in the JSON that will be generated upon calling 'form'. This method
     * should only be called in the constructor after calling the super-
     * constructor.
     * @param {JSON} model The model that will be used to generate the JSON.
     */
    setModel(model) {
        if( !model ) return;

        this.model = model;
    }

    /**
     * Forms a JSON based on a database query result using the model defined in the
     * constructor. If an array is input, an array of JSONs will be generated.
     * @param {JSON} res Database query result to be converted.
     * @returns A JSON or an array of JSONS based on the input query result(s).
     */
    form(res) {
        if( !this.model ) return null;

        let json;
        let model = this.model;

            // If an array is input, generate an array of JSONs
        if( Array.isArray(res) )
        {
            json = [];

            for( let r of res )
            json.push(this.form(r));

            return json;
        }

            /* 
                Iterate over the columns of the database query result and match the
                value with a corresponding key in the JSON.
            */
        json = {};
        for( let [key, value] of Object.entries(res) )
        json[model[key]] = value;

        return json;
    }

    /**
     * Forms a default JSON with nothing but the default values outlined
     * in the model.
     * @returns JSON with only the default values.
     */
    defaultForm() {
        return this.model;
    }
}
