export interface ResponseEntity<T> {
	status: number;
	message: string;
	data?: T;
	paging?: {
		total: number;
		totalPages: number;
		current: number;
	};
}

export interface ResponseMessage {
	message: string;
}
