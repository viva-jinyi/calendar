const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			email: {
				type: Sequelize.STRING(20),
				allowNull: false,
				unique: true
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: true,
				unique: false
			},
			password: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique: false
			},
		},
		{
			sequelize,
			timestamps: false,
			underscored: false,
			modelName: 'User',
			tableName: 'User',
			paranoid: false,
			charset: 'utf8',
			collate: 'utf8_general_ci'
		});
	}
};