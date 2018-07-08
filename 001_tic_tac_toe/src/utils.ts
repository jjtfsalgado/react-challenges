export function cls(...args) {
    return args
        .reduce((r, i) => {
            if (i) {
                if (Array.isArray(i)) r.push(cls(...i));
                else if (typeof i == "object") {
                    Object.getOwnPropertyNames(i)
                        .forEach(k => i[k] && r.push(k));
                }
                else if (i !== false) r.push(i);
            }
            return r;
        }, [])
        .join(" ");
}