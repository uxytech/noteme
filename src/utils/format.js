export const showFormattedDate = (date, nation) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    if (nation === 'id') {
        return new Date(date).toLocaleDateString('id-ID', options);
    } else if (nation === 'en') {
        return new Date(date).toLocaleDateString('en-EN', options);
    }
};

export const generateSlug = (title) => {
    const cleanedString = title.replace(/[^a-zA-Z0-9 ]/g, '');
    const slug = cleanedString.toLowerCase().replace(/\s+/g, '-');
    const uniqueSlug = `${slug}-${Date.now()}`;

    return uniqueSlug;
};
