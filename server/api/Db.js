const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

const reportTable = `
    CREATE TABLE IF NOT EXISTS report (
        rid SERIAL PRIMARY KEY,
        villain_name TEXT,
        lid INT,
        location_name TEXT,
        reported_by TEXT,
        time_reported BIGINT,
        status TEXT,
        description TEXT,
        image_url TEXT
    );`;

const locationTable = `
    CREATE TABLE IF NOT EXISTS location (
        lid SERIAL PRIMARY KEY,
        location_name TEXT,
        lat NUMERIC(9, 6),
        lng NUMERIC(9, 6),
        count INT
    );`;

function initDB() {
    pool.query(reportTable)
        .catch(err => console.error(err));
    pool.query(locationTable)
        .catch(err => console.error(err));
    console.log('Connected to database');
}

const location = {

    getLocation: async (lid) => {
        const query = {
            text: `SELECT * FROM location WHERE lid = $1`,
            values: [lid]
        };
        const result = await pool.query(query);
        return result.rows[0];
    },

    getLocationList: async () => {
        const query = {
            text: `SELECT * FROM location`
        };
        const result = await pool.query(query);
        return result.rows;
    },

    addLocation: async (location) => {
        await pool.query('BEGIN')
        try {
            const query = {
                text: `INSERT INTO location (location_name, lat, lng, count)
                    VALUES ($1, $2, $3, $4) RETURNING lid`,
                values: [location.location_name, location.lat, location.lng, location.count]
            };
            const result = await pool.query(query);
            await pool.query('COMMIT')
            return result.rows[0].lid;
        }
        catch (err) {
            await pool.query('ROLLBACK')
            throw err
        }
    },

    decreaseLocationCount: async (lid) => {
        await pool.query('BEGIN')
        try {
            const query = {
                text: `UPDATE location SET count = count - 1 WHERE lid = $1`,
                values: [lid]
            };
            await pool.query(query);
            await pool.query('COMMIT')
        }
        catch (err) {
            await pool.query('ROLLBACK')
            throw err
        }
    },

    increaseLocationCount: async (lid) => {
        await pool.query('BEGIN')
        try {
            const query = {
                text: `UPDATE location SET count = count + 1 WHERE lid = $1`,
                values: [lid]
            };
            await pool.query(query);
            await pool.query('COMMIT')
        }
        catch (err) {
            await pool.query('ROLLBACK')
            throw err
        }
    }

}


const report = {

    getReport: async (rid) => {
        const query = {
            text: `SELECT * FROM report WHERE rid = $1`,
            values: [rid]
        };
        const result = await pool.query(query);
        return result.rows[0];
    },

    getAllReports: async () => {
        const query = {
            text: `SELECT * FROM report`
        };
        const result = await pool.query(query);
        return result.rows;
    },

    addReport: async (report) => {
        await pool.query('BEGIN')
        try {
            const query = {
                text: `INSERT INTO report (villain_name, lid, location_name, reported_by, time_reported, status, description, image_url)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                values: [report.villain_name, report.lid, report.location_name, report.reported_by, report.time_reported, report.status, report.description, report.image_url]
            };
            await pool.query(query);
            await pool.query('COMMIT')
        }
        catch (err) {
            await pool.query('ROLLBACK')
            throw err
        }
    },

    removeReport: async (rid) => {
        await pool.query('BEGIN')
        try {
            const query = {
                text: `DELETE FROM report WHERE rid = $1`,
                values: [rid]
            };
            await pool.query(query);
            await pool.query('COMMIT')
        }
        catch (err) {
            await pool.query('ROLLBACK')
            throw err
        }
    },

    closeReport: async (rid) => {
        await pool.query('BEGIN')
        try {
            const query = {
                text: `UPDATE report SET status = 'CLOSED' WHERE rid = $1`,
                values: [rid]
            };
            await pool.query(query);
            await pool.query('COMMIT')
        }
        catch (err) {
            await pool.query('ROLLBACK')
            throw err
        }
    },

}

module.exports = { initDB, location, report }