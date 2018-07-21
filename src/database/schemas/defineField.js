export default function defineField(type, field, ...attrs) {
	return {
		type,
		field,
		...attrs,
	};
};