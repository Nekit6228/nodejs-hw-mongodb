const parseType = (contactType) =>{
    const isString = typeof contactType === 'string';
    if(!isString) return;

    const isType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

    if(isType(contactType)) return contactType;
};

const parseIsFavourite = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
    }
    return;
};

export const parseFilterParams = (query) =>{
    const {contactType , isFavourite } = query;

    const parsedContactType = parseType(contactType);
    const parsedIsFavorite = parseIsFavourite(isFavourite);

    return{
        contactType:parsedContactType,
        isFavourite:parsedIsFavorite,
    };
};
