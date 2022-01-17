const Sequelize = require('sequelize');

module.exports = class Birthday extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			idx: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: false
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: true,
				unique: false
			},
			month: {
				type: Sequelize.STRING(2),
				allowNull: true,
				unique: false
			},
      day: {
				type: Sequelize.STRING(2),
				allowNull: true,
				unique: false
			},
      isLunar: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
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
			modelName: 'Birthday',
			tableName: 'Birthday',
			paranoid: false,
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci'
		});
	}
};