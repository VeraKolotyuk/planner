export function toogleMoodboardImage(moodboard: string[], moodboardImage: string): string[] {
    let updated:string[] = [];
    if (moodboard) {
        const index = moodboard.indexOf(moodboardImage);
        if (index > -1) {
            updated = [...moodboard];
            updated.splice(index, 1);
        } else {
            updated = [...moodboard, moodboardImage];
        }
    }
    return updated;
}