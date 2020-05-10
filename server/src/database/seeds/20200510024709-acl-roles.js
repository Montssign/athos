module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert(
			'Roles',
			[
				{
					name: 'admin',
					description: 'O Administrador do sistema, que pode fazer tudo',
				},
				{
					name: 'client',
					description: 'O cliente, com funções limitadas',
				},
			],
			{}
		)
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('Roles', null, {})
	},
}
