declare module "is_js" {
    interface NotMatchers {
        finite: (toMatch: any) => boolean,
        number: (toMatch: any) => boolean,
        string: (toMatch: any) => boolean,
    }

    export default class Matcher {
        static not: NotMatchers;
    }
}
