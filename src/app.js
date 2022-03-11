const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { add, list, update, remove} = require("./table/functions");
const { Person, Location } = require("./table/tables");

// updating = true When creating an object for updating a currently existing table entry
const createSqlObject = (yargsObj, updating = false) => {
    let obj = {}, prefix = "";
    if(updating) prefix = "new-"; // If creating an update object, search yargs for new-name, new-country... etc

    if(yargsObj.id) obj.id = yargsObj["id"]; // Not updating ID using update queries, therefore don't search for new-id
    if(yargsObj.name) obj.name = yargsObj[prefix + "name"];
    if(yargsObj.location){
        if(yargsObj.country) obj.country = yargsObj[prefix + "country"];
        if(yargsObj.population) obj.population = yargsObj[prefix + "population"];
    }
    else{
        if(yargsObj.age) obj.age = yargsObj[prefix + "age"];
        if(yargsObj.home) obj.home = yargsObj[prefix + "home"];
    }

    // Returns nothing if the object is empty
    return Object.keys(obj).length === 0 ? undefined : obj; 
}

const app = async(yargsObj) => {
    try{
        // Prints commands / parameters to the screen
        if(yargsObj["?"] || yargsObj.h){
            console.log("Options: ");
            console.log("   --? / --h           Displays commands");
            console.log("   --add / --a         Add an entry");
            console.log("   --list / --l        Lists an entry / all entries");
            console.log("   --update / --u      Updates an entry");
            console.log("   --remove / --r      Deletes an entry")
            console.log("\nDatabases: ")
            console.log("   --location          Use the location database instead of the person database");
            console.log("\nParameters: ");
            console.log("   --id                Entry ID (only used for search queries)")
            console.log("   --name              Name of the person / location");
            console.log("   --age               Age of the person");
            console.log("   --home              Home town of the person");
            console.log("   --population        Total population at the location");
            console.log("   --country           What country the location resides in");
            console.log("   --new-name          Updated name of the person");
            console.log("   --new-age           Updated age of the person");
            console.log("   --new-home          Updated age of the person");
            console.log("   --new-population    Updated total population at the location");
            console.log("   --new-country       Updating what country the location resides in");
            return; // No need to sync / close sequelize if we're not attempting to modify it.
        }

        await sequelize.sync();
        let table = yargsObj.location ? Location : Person; // Decides what table to use
        let sqlObject = createSqlObject(yargsObj); // Creates add / search object based on yargsObj

        if (yargsObj.add || yargsObj.a) // Add
            console.log("Output: " + JSON.stringify(await add(table, sqlObject)));
        else if (yargsObj.list || yargsObj.l)  // List
            console.log("Output: " + JSON.stringify(await list(table, sqlObject), null, 2));
        else if (yargsObj.update || yargsObj.u)  // Update
            console.log("Output: " + JSON.stringify(await update(table, sqlObject, createSqlObject(yargsObj, true))));
        else if(yargsObj.remove || yargsObj.r)  // Remove
            console.log("Output: " + JSON.stringify(await remove(table, sqlObject)));
        else 
            console.log("Output: Unknown command. Type --? or --h for help.");  
    }
    catch (error) {
        console.log(error);
    }
    sequelize.close();
}

app(yargs.argv);