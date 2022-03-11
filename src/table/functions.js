exports.add = async (db, sqlObject) => {
    try{
        return await db.create(sqlObject);
    } 
    catch (error){
        return error;
    }
};

exports.list = async(db, sqlObject) => {
    try{
        return await sqlObject ? db.findOne({where: sqlObject}) : db.findAll();
    } 
    catch (error){
        return error;
    }
}

exports.update = async (db, sqlObject, newSqlObject) => {
    try {
        let model = await exports.list(db, sqlObject);
        model.set(newSqlObject);
        return await model.save();
    }
    catch (error) {
        return error;
    }
}

exports.remove = async (db, sqlObject) => {
    try {
        let model = await this.list(db, sqlObject);
        return await model.destroy();
    }
    catch (error) {
        return error;
    }
}