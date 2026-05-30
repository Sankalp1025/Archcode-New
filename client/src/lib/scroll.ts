export const scrollToSection = (sectionID: string) => {
    document.getElementById(sectionID)?.scrollIntoView({
        behavior: "smooth",
    });
};