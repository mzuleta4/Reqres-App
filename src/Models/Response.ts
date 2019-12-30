export default class Response<T> {
	success!: boolean;
	item!: T;
	token!: T;
	data!: T;
	items!: Array<T>;
}
