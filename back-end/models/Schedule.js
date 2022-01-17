const Sequelize = require('sequelize');

module.exports = class Schedule extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			idx: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: false
			},
			text: {
				type: Sequelize.STRING(50),
				allowNull: true,
				unique: false
			},
      textBgColor: {
				type: Sequelize.STRING(50),
				allowNull: true,
				unique: false
			},
      year: {
				type: Sequelize.INTEGER,
				allowNull: true,
				unique: false
			},
			month: {
				type: Sequelize.INTEGER,
				allowNull: true,
				unique: false
			},
      day: {
				type: Sequelize.INTEGER,
				allowNull: true,
				unique: false
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: false
			},
		},
		{
			sequelize,
			timestamps: false,
			underscored: false,
			modelName: 'Schedule',
			tableName: 'Schedule',
			paranoid: false,
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci'
		});
	}
};