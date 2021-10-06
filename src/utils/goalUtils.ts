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

export const balanceWheelItemsDefaults = [
    {name: 'карьера', level: 1},
    {name: 'семья', level: 1},
    {name: 'друзья', level: 1},
    {name: 'здоровье', level: 1},
    {name: 'хобби', level: 1},
    {name: 'деньги', level: 1},
    {name: 'отдых', level: 1},
    {name: 'саморазвитие', level: 1}
];