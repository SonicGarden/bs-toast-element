const getToastContainer = () => {
    const already = document.querySelector('bs-toast-container');
    if (already)
        return already;
    const container = document.createElement('bs-toast-container');
    document.body.append(container);
    return container;
};
export const openToast = (content, options = {}) => {
    const toast = document.createElement('bs-toast');
    if (options.bgColor)
        toast.setAttribute('bg-color', options.bgColor);
    if (options.delay)
        toast.setAttribute('delay', options.delay.toString());
    toast.content = content;
    getToastContainer().add(toast);
};
