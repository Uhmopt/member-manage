// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatArray<T = any>(param: any): Array<T> {
	return Array.isArray(param) ? param : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pascalToCamel(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map((item) => pascalToCamel(item));
	} else if (obj !== null && obj.constructor === Object) {
		return Object.keys(obj).reduce((result, key) => {
			const value = obj[key];
			const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			result[camelKey] = pascalToCamel(value);
			return result;
		}, {});
	}
	return obj;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonParse<T = any>(str = ""): T | null {
	try {
		return JSON.parse(str) as T;
	} catch (e) {
		return null;
	}
}
