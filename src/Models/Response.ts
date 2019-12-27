export default class Response<T> {
	success!: boolean;
	item!: T;
	token!: T;
	items!: Array<T>;
}
