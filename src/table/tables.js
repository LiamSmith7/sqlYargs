const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Location = sequelize.define("Location", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: "Unknown",
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
        allowNull: false
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

const Person = sequelize.define("People", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: "Anonymous",
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Location,
            key: "id"
        }
    }
});

module.exports = { Person, Location };

/*
CREATE TABLE Location (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	location_name VARCHAR(255) DEFAULT "Unknown" NOT NULL,
    country VARCHAR(100) DEFAULT "Earth" NOT NULL,
    population INT DEFAULT 0
);

CREATE TABLE People (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	person_name VARCHAR(255) DEFAULT "Anonymous" NOT NULL,
	age INT DEFAULT 0,
	location_id INT,
    
	FOREIGN KEY (location_id) REFERENCES Location(id)
);
*/