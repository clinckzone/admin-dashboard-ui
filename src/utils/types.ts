enum role {
	ADMIN = 'admin',
	MEMBER = 'member',
	GUEST = 'guest',
}

export type User = {
	id: number;
	name: string;
	email: string;
	role: role;
};

const dummyUser = {
	name: 'dummy',
	email: 'dummy@dummy.com',
	role: role.ADMIN,
};

export const Columns = Object.keys(dummyUser as User) as (keyof User)[];
