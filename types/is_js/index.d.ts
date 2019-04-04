declare module "is_js" {
    interface INotMatchers {
        finite: (toMatch: any) => boolean;
        number: (toMatch: any) => boolean;
        string: (toMatch: any) => boolean;
    }

    export default class Matcher {
        public static not: INotMatchers;
    }
}
