export function getNextId(elem: string) {
	return elem.slice(-5) + elem.slice(10, 20)+ Math.floor(Math.random()*100);
}