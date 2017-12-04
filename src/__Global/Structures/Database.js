const { connect } = require(`mongodb`);

class Database {
	constructor() {
		this.url = process.env.MONGODB_URI;
	}

	insert(objects) {
		return new Promise((resolve, reject) => {
			connect(this.url, (error, db) => {
				if (error) return reject(error);
				const collection = db.collection(`documents`);
				collection.insertMany(objects, (error, result) => {
					if (error) return reject(error);
					resolve(result);
					return true;
				});
				return true;
			});
		});
	}

	find(object) {
		return new Promise((resolve, reject) => {
			connect(this.url, (error, db) => {
				if (error) return reject(error);
				const collection = db.collection(`documents`);
				collection.find(object).toArray((error, result) => {
					if (error) return reject(error);
					resolve(result);
					return true;
				});
				return true;
			});
		});
	}

	update(oldObject, newObject) {
		return new Promise((resolve, reject) => {
			connect(this.url, (error, db) => {
				if (error) return reject(error);
				const collection = db.collection(`documents`);
				collection.updateOne(oldObject, { $set: newObject }, (error, result) => {
					if (error) return reject(error);
					resolve(result);
					return true;
				});
				return true;
			});
		});
	}

	remove(object) {
		return new Promise((resolve, reject) => {
			connect(this.url, (error, db) => {
				if (error) return reject(error);
				const collection = db.collection(`documents`);
				collection.deleteOne(object, (error, result) => {
					if (error) return reject(error);
					resolve(result);
					return true;
				});
				return true;
			});
		});
	}
}

module.exports = Database;
