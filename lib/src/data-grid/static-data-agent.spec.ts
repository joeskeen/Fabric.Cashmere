import { StaticDataAgent, SortDirection } from './static-data-agent';
let mockData = Object.freeze(
    (require('./mock-data.json') as IFakePerson[])
        .map(o => Object.freeze(Object.assign(o, { birth_date: new Date(o.birth_date) })))
) as IFakePerson[];

describe('StaticDataAgent', () => {
    describe('.fetch()', () => {
        describe('when `data` is an invalid data set', () => {
            describe('`null`', () => {
                let agent: StaticDataAgent<any>;
                beforeEach(() => {
                    agent = new StaticDataAgent<any>((null as any) as any[]);
                });
                it('should return an empty result set', () => {
                    agent.fetch({}).subscribe(r => expect(r).toEqual([]));
                });
            });
            describe('`undefined`', () => {
                let agent: StaticDataAgent<any>;
                beforeEach(() => {
                    agent = new StaticDataAgent<any>(
                        (undefined as any) as any[]
                    );
                });
                it('should return an empty result set', () => {
                    agent.fetch({}).subscribe(r => expect(r).toEqual([]));
                });
            });
            describe('`1`', () => {
                let agent: StaticDataAgent<any>;
                beforeEach(() => {
                    agent = new StaticDataAgent<any>((1 as any) as any[]);
                });
                it('should return an empty result set', () => {
                    agent.fetch({}).subscribe(r => expect(r).toEqual([]));
                });
            });
            describe('`\'1\'`', () => {
                let agent: StaticDataAgent<any>;
                beforeEach(() => {
                    agent = new StaticDataAgent<any>(('1' as any) as any[]);
                });
                it('should return an empty result set', () => {
                    agent.fetch({}).subscribe(r => expect(r).toEqual([]));
                });
            });
            describe('`NaN`', () => {
                let agent: StaticDataAgent<any>;
                beforeEach(() => {
                    agent = new StaticDataAgent<any>((NaN as any) as any[]);
                });
                it('should return an empty result set', () => {
                    agent.fetch({}).subscribe(r => expect(r).toEqual([]));
                });
            });
            describe('`{}`', () => {
                let agent: StaticDataAgent<any>;
                beforeEach(() => {
                    agent = new StaticDataAgent<any>(({} as any) as any[]);
                });
                it('should return an empty result set', () => {
                    agent.fetch({}).subscribe(r => expect(r).toEqual([]));
                });
            });
        });

        describe('when `data` is a valid data set', () => {
            let data: IFakePerson[];
            let agent: StaticDataAgent<IFakePerson>;
            beforeEach(() => {
                data = mockData.slice();
                agent = new StaticDataAgent(data);
            });
            describe('with an empty query (`{}`)', () => {
                it('should return the first ten records', () => {
                    agent
                        .fetch({})
                        .subscribe(r => expect(r).toEqual(data.slice(0, 10)));
                });
            });
            describe('with `{ pageSize: 0 }` query', () => {
                it('should return the first ten records', () => {
                    agent
                        .fetch({ pageSize: 0 })
                        .subscribe(r => expect(r).toEqual(data.slice(0, 10)));
                });
            });
            describe('with `{ pageSize: 3 }` query', () => {
                it('should return the first three records', () => {
                    agent
                        .fetch({ pageSize: 3 })
                        .subscribe(r => expect(r).toEqual(data.slice(0, 3)));
                });
            });
            describe('with `{ page: 3 }` query', () => {
                it('should return records at indicies 20-29', () => {
                    agent
                        .fetch({ page: 3 })
                        .subscribe(r => expect(r).toEqual(data.slice(20, 30)));
                });
            });
            describe('with `{ sortBy: \'first_name\', pageSize: 3 }` query', () => {
                it('should return the first three people alphabetically by first name', () => {
                    agent
                        .fetch({ sortBy: 'first_name', pageSize: 3 })
                        .subscribe(r =>
                            expect(r).toEqual([
                                {
                                    id: 33,
                                    first_name: 'Adena',
                                    last_name: 'McLukie',
                                    email: 'amclukiew@shareasale.com',
                                    gender: 'Female',
                                    ip_address: '46.139.18.107',
                                    birth_date: new Date('2025-07-30T21:34:29.546Z')
                                },
                                {
                                    id: 21,
                                    first_name: 'Ahmad',
                                    last_name: 'Osler',
                                    email: 'aoslerk@boston.com',
                                    gender: 'Male',
                                    ip_address: '74.25.252.84',
                                    birth_date: new Date('2022-10-18T09:34:31.450Z')
                                },
                                {
                                    id: 11,
                                    first_name: 'Ailis',
                                    last_name: 'Richt',
                                    email: 'arichta@networkadvertising.org',
                                    gender: 'Female',
                                    ip_address: '179.14.70.144',
                                    birth_date: new Date('2021-08-10T20:32:05.537Z')
                                }
                            ])
                        );
                });
            });
            describe('with `{ sortBy: \'first_name\', pageSize: 3, sortDirection: SortDirection.Descending }` query', () => {
                it('should return the last three people alphabetically by first name', () => {
                    agent
                        .fetch({ sortBy: 'first_name', pageSize: 3, sortDirection: SortDirection.Descending })
                        .subscribe(r =>
                            expect(r).toEqual([
                                {
                                    id: 46,
                                    first_name: 'Zea',
                                    last_name: 'Ainscow',
                                    email: 'zainscow19@dropbox.com',
                                    gender: 'Female',
                                    ip_address: '108.212.242.177',
                                    birth_date: new Date('2007-03-29T03:52:44.156Z')
                                },
                                {
                                    id: 66,
                                    first_name: 'Willie',
                                    last_name: 'Pardon',
                                    email: 'wpardon1t@networksolutions.com',
                                    gender: 'Male',
                                    ip_address: '129.118.250.95',
                                    birth_date: new Date('2028-01-25T00:16:23.838Z')
                                },
                                {
                                    id: 90,
                                    first_name: 'Willard',
                                    last_name: 'Dracksford',
                                    email: 'wdracksford2h@flavors.me',
                                    gender: 'Male',
                                    ip_address: '168.14.46.205',
                                    birth_date: new Date('2032-12-03T23:20:12.163Z')
                                }
                            ])
                        );
                });
            });
            describe('with `{ sortBy: \'id\', pageSize: 3, sortDirection: SortDirection.Ascending }` query', () => {
                it('should return the first three people by id', () => {
                    agent
                        .fetch({ sortBy: 'id', pageSize: 3, sortDirection: SortDirection.Ascending })
                        .subscribe(r =>
                            expect(r).toEqual([
                                {
                                    id: 1,
                                    first_name: 'Constancy',
                                    last_name: 'Chartman',
                                    email: 'cchartman0@last.fm',
                                    gender: 'Female',
                                    ip_address: '24.114.233.92',
                                    birth_date: new Date('2008-11-16T03:38:32.557Z')
                                }, {
                                    id: 2,
                                    first_name: 'Blair',
                                    last_name: 'Timmins',
                                    email: 'btimmins1@xrea.com',
                                    gender: 'Male',
                                    ip_address: '239.166.215.94',
                                    birth_date: new Date('2025-11-17T06:46:22.559Z')
                                }, {
                                    id: 3,
                                    first_name: 'Guntar',
                                    last_name: 'Cardello',
                                    email: 'gcardello2@gov.uk',
                                    gender: 'Male',
                                    ip_address: '34.30.109.209',
                                    birth_date: new Date('2003-10-09T23:05:53.585Z')
                                }
                            ])
                        );
                });
            });
            describe('with `{ sortBy: \'birth_date\', pageSize: 3, sortDirection: SortDirection.Ascending }` query', () => {
                it('should return the youngest three people by birth date', () => {
                    agent
                        .fetch({ sortBy: 'birth_date', pageSize: 3, sortDirection: SortDirection.Descending })
                        .subscribe(r =>
                            expect(r).toEqual([
                                {
                                    id: 90,
                                    first_name: 'Willard',
                                    last_name: 'Dracksford',
                                    email: 'wdracksford2h@flavors.me',
                                    gender: 'Male',
                                    ip_address: '168.14.46.205',
                                    birth_date: new Date('2032-12-03T23:20:12.163Z')
                                }, {
                                    id: 88,
                                    first_name: 'Vail',
                                    last_name: 'Sinnie',
                                    email: 'vsinnie2f@reddit.com',
                                    gender: 'Male',
                                    ip_address: '70.172.37.181',
                                    birth_date: new Date('2031-10-06T03:47:57.772Z')
                                }, {
                                    id: 79,
                                    first_name: 'Alphonso',
                                    last_name: 'Trevains',
                                    email: 'atrevains26@arizona.edu',
                                    gender: 'Male',
                                    ip_address: '110.96.33.159',
                                    birth_date: new Date('2031-05-05T01:38:58.718Z')
                                }
                            ])
                        );
                });
            });

            // TODO: `filter` tests
        });
    });
});

interface IFakePerson {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: 'Female' | 'Male';
    ip_address: string;
    birth_date: Date;
}
