export interface Address {
	street: string;
	provinces: string;
	regencies: string;
	districts: string;
	villages: string;
}

export interface Province {
	id: string;
	name: string;
}

export interface Regencies extends Province {
	province_id: string;
}

export interface Districts extends Province {
	regency_id: string;
}

export interface Villages extends Province {
	district_id: string;
}
