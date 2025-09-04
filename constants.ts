
import { Plan, FaqItem, Author, Region, Country, Testimonial } from './types';

// Utility function to convert country name to URL slug
export const countryNameToSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Note: PLANS constant removed - all plan data now comes from API via dataService



export const AUTHOR_INFO: Author = {
    name: "Vasil Andreev",
    title: "Founder of Travel eSIMple & Travel eSIM",
    bio: "Hello and welcome to my travel page! I'm Vasil Andreev, a 25-year-old travel enthusiast with a passion for exploring the world on a budget. Over the past few years, I've honed my skills in SEO, but my true love lies in immersing myself in new cultures and landscapes. Inspired by the nomadic lifestyle, I founded Travel eSIM to share my expertise on saving money from roaming charges. With solo adventures across Europe and Asia under my belt, I'm excited to share my experiences and tips with fellow travelers. Join me as I navigate the globe, one affordable journey at a time.",
    avatarUrl: "/vasil-andreev-768x1024.jpeg"
};

export const REGIONS: Region[] = [
    {
        id: 'europe',
        name: 'Europe',
        description: 'Coverage across the continent.',
        imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 'asia',
        name: 'Asia',
        description: 'Connect in top Asian destinations.',
        imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 'north-america',
        name: 'North America',
        description: 'Data for USA, Canada & Mexico.',
        imageUrl: 'https://images.unsplash.com/photo-1546436836-07a91091f160?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 'south-america',
        name: 'South America',
        description: 'Connect across South America.',
        imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 'africa',
        name: 'Africa',
        description: 'Stay connected in Africa.',
        imageUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 'oceania',
        name: 'Oceania',
        description: 'Connect in the Pacific region.',
        imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop',
    },
];

export const COUNTRIES: Country[] = [
    // Countries from the original list
    { id: 'tr', name: 'Turkey', flag: '🇹🇷', flagUrl: '/esim-data/flags/tr.svg', regionId: 'europe', slug: countryNameToSlug('Turkey'), countryCode: 'TR', plans: [] },
    { id: 'th', name: 'Thailand', flag: '🇹🇭', flagUrl: '/esim-data/flags/th.svg', regionId: 'asia', slug: countryNameToSlug('Thailand'), countryCode: 'TH', plans: [] },
    { id: 'my', name: 'Malaysia', flag: '🇲🇾', flagUrl: '/esim-data/flags/my.svg', regionId: 'asia', slug: countryNameToSlug('Malaysia'), countryCode: 'MY', plans: [] },
    { id: 'ae', name: 'United Arab Emirates', flag: '🇦🇪', flagUrl: '/esim-data/flags/ae.svg', regionId: 'asia', slug: countryNameToSlug('United Arab Emirates'), countryCode: 'AE', plans: [] },
    { id: 'in', name: 'India', flag: '🇮🇳', flagUrl: '/esim-data/flags/in.svg', regionId: 'asia', slug: countryNameToSlug('India'), countryCode: 'IN', plans: [] },
    { id: 'nl', name: 'Netherlands', flag: '🇳🇱', flagUrl: '/esim-data/flags/nl.svg', regionId: 'europe', slug: countryNameToSlug('Netherlands'), countryCode: 'NL', plans: [] },
    { id: 'kr', name: 'South Korea', flag: '🇰🇷', flagUrl: '/esim-data/flags/kr.svg', regionId: 'asia', slug: countryNameToSlug('South Korea'), countryCode: 'KR', plans: [] },
    { id: 'sg', name: 'Singapore', flag: '🇸🇬', flagUrl: '/esim-data/flags/sg.svg', regionId: 'asia', slug: countryNameToSlug('Singapore'), countryCode: 'SG', plans: [] },
    { id: 'ca', name: 'Canada', flag: '🇨🇦', flagUrl: '/esim-data/flags/ca.svg', regionId: 'north-america', slug: countryNameToSlug('Canada'), countryCode: 'CA', plans: [] },
    { id: 'mx', name: 'Mexico', flag: '🇲🇽', flagUrl: '/esim-data/flags/mx.svg', regionId: 'north-america', slug: countryNameToSlug('Mexico'), countryCode: 'MX', plans: [] },
    { id: 'ad', name: 'Andorra', flag: '🇦🇩', flagUrl: '/esim-data/flags/ad.svg', regionId: 'europe', slug: countryNameToSlug('Andorra'), plans: [] },
    { id: 'af', name: 'Afghanistan', flag: '🇦🇫', flagUrl: '/esim-data/flags/af.svg', regionId: 'asia', slug: countryNameToSlug('Afghanistan'), plans: [] },
    { id: 'ag', name: 'Antigua and Barbuda', flag: '🇦🇬', flagUrl: '/esim-data/flags/ag.svg', regionId: 'north-america', slug: countryNameToSlug('Antigua and Barbuda'), plans: [] },
    { id: 'ai', name: 'Anguilla', flag: '🇦🇮', flagUrl: '/esim-data/flags/ai.svg', regionId: 'north-america', slug: countryNameToSlug('Anguilla'), plans: [] },
    { id: 'al', name: 'Albania', flag: '🇦🇱', flagUrl: '/esim-data/flags/al.svg', regionId: 'europe', slug: countryNameToSlug('Albania'), plans: [] },
    { id: 'am', name: 'Armenia', flag: '🇦🇲', flagUrl: '/esim-data/flags/am.svg', regionId: 'asia', slug: countryNameToSlug('Armenia'), plans: [] },
    { id: 'ar', name: 'Argentina', flag: '🇦🇷', flagUrl: '/esim-data/flags/ar.svg', regionId: 'south-america', slug: countryNameToSlug('Argentina'), plans: [] },
    { id: 'as', name: 'American Samoa', flag: '🇦🇸', flagUrl: '/esim-data/flags/as.svg', regionId: 'oceania', slug: countryNameToSlug('American Samoa'), plans: [] },
    { id: 'at', name: 'Austria', flag: '🇦🇹', flagUrl: '/esim-data/flags/at.svg', regionId: 'europe', slug: countryNameToSlug('Austria'), plans: [] },
    { id: 'au', name: 'Australia', flag: '🇦🇺', flagUrl: '/esim-data/flags/au.svg', regionId: 'oceania', slug: countryNameToSlug('Australia'), countryCode: 'AU', plans: [] },
    { id: 'aw', name: 'Aruba', flag: '🇦🇼', flagUrl: '/esim-data/flags/aw.svg', regionId: 'north-america', slug: countryNameToSlug('Aruba'), plans: [] },
    { id: 'az', name: 'Azerbaijan', flag: '🇦🇿', flagUrl: '/esim-data/flags/az.svg', regionId: 'asia', slug: countryNameToSlug('Azerbaijan'), plans: [] },
    { id: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦', flagUrl: '/esim-data/flags/ba.svg', regionId: 'europe', slug: countryNameToSlug('Bosnia and Herzegovina'), plans: [] },
    { id: 'bb', name: 'Barbados', flag: '🇧🇧', flagUrl: '/esim-data/flags/bb.svg', regionId: 'north-america', slug: countryNameToSlug('Barbados'), plans: [] },
    { id: 'bd', name: 'Bangladesh', flag: '🇧🇩', flagUrl: '/esim-data/flags/bd.svg', regionId: 'asia', slug: countryNameToSlug('Bangladesh'), plans: [] },
    { id: 'be', name: 'Belgium', flag: '🇧🇪', flagUrl: '/esim-data/flags/be.svg', regionId: 'europe', slug: countryNameToSlug('Belgium'), plans: [] },
    { id: 'bf', name: 'Burkina Faso', flag: '🇧🇫', flagUrl: '/esim-data/flags/bf.svg', regionId: 'africa', slug: countryNameToSlug('Burkina Faso'), plans: [] },
    { id: 'bg', name: 'Bulgaria', flag: '🇧🇬', flagUrl: '/esim-data/flags/bg.svg', regionId: 'europe', slug: countryNameToSlug('Bulgaria'), plans: [] },
    { id: 'bh', name: 'Bahrain', flag: '🇧🇭', flagUrl: '/esim-data/flags/bh.svg', regionId: 'asia', slug: countryNameToSlug('Bahrain'), plans: [] },
    { id: 'bj', name: 'Benin', flag: '🇧🇯', flagUrl: '/esim-data/flags/bj.svg', regionId: 'africa', slug: countryNameToSlug('Benin'), plans: [] },
    { id: 'bl', name: 'Saint Barthélemy', flag: '🇧🇱', flagUrl: '/esim-data/flags/bl.svg', regionId: 'north-america', slug: countryNameToSlug('Saint Barthélemy'), plans: [] },
    { id: 'bm', name: 'Bermuda', flag: '🇧🇲', flagUrl: '/esim-data/flags/bm.svg', regionId: 'north-america', slug: countryNameToSlug('Bermuda'), plans: [] },
    { id: 'bn', name: 'Brunei', flag: '🇧🇳', flagUrl: '/esim-data/flags/bn.svg', regionId: 'asia', slug: countryNameToSlug('Brunei'), plans: [] },
    { id: 'bo', name: 'Bolivia', flag: '🇧🇴', flagUrl: '/esim-data/flags/bo.svg', regionId: 'south-america', slug: countryNameToSlug('Bolivia'), plans: [] },
    { id: 'bq', name: 'Caribbean Netherlands', flag: '🇧🇶', flagUrl: '/esim-data/flags/bq.svg', regionId: 'north-america', slug: countryNameToSlug('Caribbean Netherlands'), plans: [] },
    { id: 'br', name: 'Brazil', flag: '🇧🇷', flagUrl: '/esim-data/flags/br.svg', regionId: 'south-america', slug: countryNameToSlug('Brazil'), countryCode: 'BR', plans: [] },
    { id: 'bs', name: 'Bahamas', flag: '🇧🇸', flagUrl: '/esim-data/flags/bs.svg', regionId: 'north-america', slug: countryNameToSlug('Bahamas'), plans: [] },
    { id: 'bw', name: 'Botswana', flag: '🇧🇼', flagUrl: '/esim-data/flags/bw.svg', regionId: 'africa', slug: countryNameToSlug('Botswana'), plans: [] },
    { id: 'bz', name: 'Belize', flag: '🇧🇿', flagUrl: '/esim-data/flags/bz.svg', regionId: 'north-america', slug: countryNameToSlug('Belize'), plans: [] },
    { id: 'cd', name: 'Democratic Republic of the Congo', flag: '🇨🇩', flagUrl: '/esim-data/flags/cd.svg', regionId: 'africa', slug: countryNameToSlug('Democratic Republic of the Congo'), plans: [] },
    { id: 'cf', name: 'Central African Republic', flag: '🇨🇫', flagUrl: '/esim-data/flags/cf.svg', regionId: 'africa', slug: countryNameToSlug('Central African Republic'), plans: [] },
    { id: 'cg', name: 'Republic of the Congo', flag: '🇨🇬', flagUrl: '/esim-data/flags/cg.svg', regionId: 'africa', slug: countryNameToSlug('Republic of the Congo'), plans: [] },
    { id: 'ch', name: 'Switzerland', flag: '🇨🇭', flagUrl: '/esim-data/flags/ch.svg', regionId: 'europe', slug: countryNameToSlug('Switzerland'), countryCode: 'CH', plans: [] },
    { id: 'ci', name: 'Ivory Coast', flag: '🇨🇮', flagUrl: '/esim-data/flags/ci.svg', regionId: 'africa', slug: countryNameToSlug('Ivory Coast'), plans: [] },
    { id: 'cl', name: 'Chile', flag: '🇨🇱', flagUrl: '/esim-data/flags/cl.svg', regionId: 'south-america', slug: countryNameToSlug('Chile'), plans: [] },
    { id: 'cm', name: 'Cameroon', flag: '🇨🇲', flagUrl: '/esim-data/flags/cm.svg', regionId: 'africa', slug: countryNameToSlug('Cameroon'), plans: [] },
    { id: 'cn', name: 'China', flag: '🇨🇳', flagUrl: '/esim-data/flags/cn.svg', regionId: 'asia', slug: countryNameToSlug('China'), plans: [] },
    { id: 'co', name: 'Colombia', flag: '🇨🇴', flagUrl: '/esim-data/flags/co.svg', regionId: 'south-america', slug: countryNameToSlug('Colombia'), plans: [] },
    { id: 'cr', name: 'Costa Rica', flag: '🇨🇷', flagUrl: '/esim-data/flags/cr.svg', regionId: 'north-america', slug: countryNameToSlug('Costa Rica'), plans: [] },
    { id: 'cv', name: 'Cape Verde', flag: '🇨🇻', flagUrl: '/esim-data/flags/cv.svg', regionId: 'africa', slug: countryNameToSlug('Cape Verde'), plans: [] },
    { id: 'cw', name: 'Curaçao', flag: '🇨🇼', flagUrl: '/esim-data/flags/cw.svg', regionId: 'north-america', slug: countryNameToSlug('Curaçao'), plans: [] },
    { id: 'cy', name: 'Cyprus', flag: '🇨🇾', flagUrl: '/esim-data/flags/cy.svg', regionId: 'europe', slug: countryNameToSlug('Cyprus'), plans: [] },
    { id: 'cz', name: 'Czech Republic', flag: '🇨🇿', flagUrl: '/esim-data/flags/cz.svg', regionId: 'europe', slug: countryNameToSlug('Czech Republic'), plans: [] },
    { id: 'de', name: 'Germany', flag: '🇩🇪', flagUrl: '/esim-data/flags/de.svg', regionId: 'europe', slug: countryNameToSlug('Germany'), countryCode: 'DE', plans: [] },
    { id: 'dk', name: 'Denmark', flag: '🇩🇰', flagUrl: '/esim-data/flags/dk.svg', regionId: 'europe', slug: countryNameToSlug('Denmark'), plans: [] },
    { id: 'dm', name: 'Dominica', flag: '🇩🇲', flagUrl: '/esim-data/flags/dm.svg', regionId: 'north-america', slug: countryNameToSlug('Dominica'), plans: [] },
    { id: 'do', name: 'Dominican Republic', flag: '🇩🇴', flagUrl: '/esim-data/flags/do.svg', regionId: 'north-america', slug: countryNameToSlug('Dominican Republic'), plans: [] },
    { id: 'dz', name: 'Algeria', flag: '🇩🇿', flagUrl: '/esim-data/flags/dz.svg', regionId: 'africa', slug: countryNameToSlug('Algeria'), plans: [] },
    { id: 'ec', name: 'Ecuador', flag: '🇪🇨', flagUrl: '/esim-data/flags/ec.svg', regionId: 'south-america', slug: countryNameToSlug('Ecuador'), plans: [] },
    { id: 'ee', name: 'Estonia', flag: '🇪🇪', flagUrl: '/esim-data/flags/ee.svg', regionId: 'europe', slug: countryNameToSlug('Estonia'), plans: [] },
    { id: 'eg', name: 'Egypt', flag: '🇪🇬', flagUrl: '/esim-data/flags/eg.svg', regionId: 'africa', slug: countryNameToSlug('Egypt'), plans: [] },
    { id: 'es', name: 'Spain', flag: '🇪🇸', flagUrl: '/esim-data/flags/es.svg', regionId: 'europe', slug: countryNameToSlug('Spain'), countryCode: 'ES', plans: [] },
    { id: 'fi', name: 'Finland', flag: '🇫🇮', flagUrl: '/esim-data/flags/fi.svg', regionId: 'europe', slug: countryNameToSlug('Finland'), plans: [] },
    { id: 'fj', name: 'Fiji', flag: '🇫🇯', flagUrl: '/esim-data/flags/fj.svg', regionId: 'oceania', slug: countryNameToSlug('Fiji'), plans: [] },
    { id: 'fo', name: 'Faroe Islands', flag: '🇫🇴', flagUrl: '/esim-data/flags/fo.svg', regionId: 'europe', slug: countryNameToSlug('Faroe Islands'), plans: [] },
    { id: 'fr', name: 'France', flag: '🇫🇷', flagUrl: '/esim-data/flags/fr.svg', regionId: 'europe', slug: countryNameToSlug('France'), countryCode: 'FR', plans: [] },
    { id: 'ga', name: 'Gabon', flag: '🇬🇦', flagUrl: '/esim-data/flags/ga.svg', regionId: 'africa', slug: countryNameToSlug('Gabon'), plans: [] },

    { id: 'gb', name: 'United Kingdom', flag: '🇬🇧', flagUrl: '/esim-data/flags/gb.svg', regionId: 'europe', slug: countryNameToSlug('United Kingdom'), countryCode: 'GB', plans: [] },
    { id: 'gd', name: 'Grenada', flag: '🇬🇩', flagUrl: '/esim-data/flags/gd.svg', regionId: 'north-america', slug: countryNameToSlug('Grenada'), plans: [] },
    { id: 'ge', name: 'Georgia', flag: '🇬🇪', flagUrl: '/esim-data/flags/ge.svg', regionId: 'asia', slug: countryNameToSlug('Georgia'), plans: [] },
    { id: 'gf', name: 'French Guiana', flag: '🇬🇫', flagUrl: '/esim-data/flags/gf.svg', regionId: 'south-america', slug: countryNameToSlug('French Guiana'), plans: [] },
    { id: 'gg', name: 'Guernsey', flag: '🇬🇬', flagUrl: '/esim-data/flags/gg.svg', regionId: 'europe', slug: countryNameToSlug('Guernsey'), plans: [] },
    { id: 'gh', name: 'Ghana', flag: '🇬🇭', flagUrl: '/esim-data/flags/gh.svg', regionId: 'africa', slug: countryNameToSlug('Ghana'), plans: [] },
    { id: 'gi', name: 'Gibraltar', flag: '🇬🇮', flagUrl: '/esim-data/flags/gi.svg', regionId: 'europe', slug: countryNameToSlug('Gibraltar'), plans: [] },
    { id: 'gl', name: 'Greenland', flag: '🇬🇱', flagUrl: '/esim-data/flags/gl.svg', regionId: 'north-america', slug: countryNameToSlug('Greenland'), plans: [] },
    { id: 'gm', name: 'Gambia', flag: '🇬🇲', flagUrl: '/esim-data/flags/gm.svg', regionId: 'africa', slug: countryNameToSlug('Gambia'), plans: [] },
    { id: 'gn', name: 'Guinea', flag: '🇬🇳', flagUrl: '/esim-data/flags/gn.svg', regionId: 'africa', slug: countryNameToSlug('Guinea'), plans: [] },
    { id: 'gp', name: 'Guadeloupe', flag: '🇬🇵', flagUrl: '/esim-data/flags/gp.svg', regionId: 'north-america', slug: countryNameToSlug('Guadeloupe'), plans: [] },
    { id: 'gr', name: 'Greece', flag: '🇬🇷', flagUrl: '/esim-data/flags/gr.svg', regionId: 'europe', slug: countryNameToSlug('Greece'), plans: [] },
    { id: 'gt', name: 'Guatemala', flag: '🇬🇹', flagUrl: '/esim-data/flags/gt.svg', regionId: 'north-america', slug: countryNameToSlug('Guatemala'), plans: [] },
    { id: 'gu', name: 'Guam', flag: '🇬🇺', flagUrl: '/esim-data/flags/gu.svg', regionId: 'oceania', slug: countryNameToSlug('Guam'), plans: [] },
    { id: 'gw', name: 'Guinea-Bissau', flag: '🇬🇼', flagUrl: '/esim-data/flags/gw.svg', regionId: 'africa', slug: countryNameToSlug('Guinea-Bissau'), plans: [] },
    { id: 'gy', name: 'Guyana', flag: '🇬🇾', flagUrl: '/esim-data/flags/gy.svg', regionId: 'south-america', slug: countryNameToSlug('Guyana'), plans: [] },
    { id: 'hk', name: 'Hong Kong', flag: '🇭🇰', flagUrl: '/esim-data/flags/hk.svg', regionId: 'asia', slug: countryNameToSlug('Hong Kong'), plans: [] },
    { id: 'hn', name: 'Honduras', flag: '🇭🇳', flagUrl: '/esim-data/flags/hn.svg', regionId: 'north-america', slug: countryNameToSlug('Honduras'), plans: [] },
    { id: 'hr', name: 'Croatia', flag: '🇭🇷', flagUrl: '/esim-data/flags/hr.svg', regionId: 'europe', slug: countryNameToSlug('Croatia'), plans: [] },
    { id: 'ht', name: 'Haiti', flag: '🇭🇹', flagUrl: '/esim-data/flags/ht.svg', regionId: 'north-america', slug: countryNameToSlug('Haiti'), plans: [] },
    { id: 'hu', name: 'Hungary', flag: '🇭🇺', flagUrl: '/esim-data/flags/hu.svg', regionId: 'europe', slug: countryNameToSlug('Hungary'), plans: [] },
    { id: 'id', name: 'Indonesia', flag: '🇮🇩', flagUrl: '/esim-data/flags/id.svg', regionId: 'asia', slug: countryNameToSlug('Indonesia'), countryCode: 'ID', plans: [] },
    { id: 'ie', name: 'Ireland', flag: '🇮🇪', flagUrl: '/esim-data/flags/ie.svg', regionId: 'europe', slug: countryNameToSlug('Ireland'), plans: [] },
    { id: 'il', name: 'Israel', flag: '🇮🇱', flagUrl: '/esim-data/flags/il.svg', regionId: 'asia', slug: countryNameToSlug('Israel'), plans: [] },
    { id: 'im', name: 'Isle of Man', flag: '🇮🇲', flagUrl: '/esim-data/flags/im.svg', regionId: 'europe', slug: countryNameToSlug('Isle of Man'), plans: [] },

    { id: 'iq', name: 'Iraq', flag: '🇮🇶', flagUrl: '/esim-data/flags/iq.svg', regionId: 'asia', slug: countryNameToSlug('Iraq'), plans: [] },
    { id: 'is', name: 'Iceland', flag: '🇮🇸', flagUrl: '/esim-data/flags/is.svg', regionId: 'europe', slug: countryNameToSlug('Iceland'), plans: [] },
    { id: 'it', name: 'Italy', flag: '🇮🇹', flagUrl: '/esim-data/flags/it.svg', regionId: 'europe', slug: countryNameToSlug('Italy'), countryCode: 'IT', plans: [] },
    { id: 'je', name: 'Jersey', flag: '🇯🇪', flagUrl: '/esim-data/flags/je.svg', regionId: 'europe', slug: countryNameToSlug('Jersey'), plans: [] },
    { id: 'jm', name: 'Jamaica', flag: '🇯🇲', flagUrl: '/esim-data/flags/jm.svg', regionId: 'north-america', slug: countryNameToSlug('Jamaica'), plans: [] },
    { id: 'jo', name: 'Jordan', flag: '🇯🇴', flagUrl: '/esim-data/flags/jo.svg', regionId: 'asia', slug: countryNameToSlug('Jordan'), plans: [] },
    { id: 'jp', name: 'Japan', flag: '🇯🇵', flagUrl: '/esim-data/flags/jp.svg', regionId: 'asia', slug: countryNameToSlug('Japan'), countryCode: 'JP', plans: [] },
    { id: 'ke', name: 'Kenya', flag: '🇰🇪', flagUrl: '/esim-data/flags/ke.svg', regionId: 'africa', slug: countryNameToSlug('Kenya'), plans: [] },
    { id: 'kg', name: 'Kyrgyzstan', flag: '🇰🇬', flagUrl: '/esim-data/flags/kg.svg', regionId: 'asia', slug: countryNameToSlug('Kyrgyzstan'), plans: [] },
    { id: 'kh', name: 'Cambodia', flag: '🇰🇭', flagUrl: '/esim-data/flags/kh.svg', regionId: 'asia', slug: countryNameToSlug('Cambodia'), plans: [] },
    { id: 'kn', name: 'Saint Kitts and Nevis', flag: '🇰🇳', flagUrl: '/esim-data/flags/kn.svg', regionId: 'north-america', slug: countryNameToSlug('Saint Kitts and Nevis'), plans: [] },
    { id: 'kw', name: 'Kuwait', flag: '🇰🇼', flagUrl: '/esim-data/flags/kw.svg', regionId: 'asia', slug: countryNameToSlug('Kuwait'), plans: [] },
    { id: 'ky', name: 'Cayman Islands', flag: '🇰🇾', flagUrl: '/esim-data/flags/ky.svg', regionId: 'north-america', slug: countryNameToSlug('Cayman Islands'), plans: [] },
    { id: 'kz', name: 'Kazakhstan', flag: '🇰🇿', flagUrl: '/esim-data/flags/kz.svg', regionId: 'asia', slug: countryNameToSlug('Kazakhstan'), plans: [] },
    { id: 'la', name: 'Laos', flag: '🇱🇦', flagUrl: '/esim-data/flags/la.svg', regionId: 'asia', slug: countryNameToSlug('Laos'), plans: [] },
    { id: 'lc', name: 'Saint Lucia', flag: '🇱🇨', flagUrl: '/esim-data/flags/lc.svg', regionId: 'north-america', slug: countryNameToSlug('Saint Lucia'), plans: [] },
    { id: 'li', name: 'Liechtenstein', flag: '🇱🇮', flagUrl: '/esim-data/flags/li.svg', regionId: 'europe', slug: countryNameToSlug('Liechtenstein'), plans: [] },
    { id: 'lk', name: 'Sri Lanka', flag: '🇱🇰', flagUrl: '/esim-data/flags/lk.svg', regionId: 'asia', slug: countryNameToSlug('Sri Lanka'), plans: [] },
    { id: 'lr', name: 'Liberia', flag: '🇱🇷', flagUrl: '/esim-data/flags/lr.svg', regionId: 'africa', slug: countryNameToSlug('Liberia'), plans: [] },
    { id: 'ls', name: 'Lesotho', flag: '🇱🇸', flagUrl: '/esim-data/flags/ls.svg', regionId: 'africa', slug: countryNameToSlug('Lesotho'), plans: [] },
    { id: 'lt', name: 'Lithuania', flag: '🇱🇹', flagUrl: '/esim-data/flags/lt.svg', regionId: 'europe', slug: countryNameToSlug('Lithuania'), plans: [] },
    { id: 'lu', name: 'Luxembourg', flag: '🇱🇺', flagUrl: '/esim-data/flags/lu.svg', regionId: 'europe', slug: countryNameToSlug('Luxembourg'), plans: [] },
    { id: 'lv', name: 'Latvia', flag: '🇱🇻', flagUrl: '/esim-data/flags/lv.svg', regionId: 'europe', slug: countryNameToSlug('Latvia'), plans: [] },
    { id: 'ma', name: 'Morocco', flag: '🇲🇦', flagUrl: '/esim-data/flags/ma.svg', regionId: 'africa', slug: countryNameToSlug('Morocco'), plans: [] },
    { id: 'mc', name: 'Monaco', flag: '🇲🇨', flagUrl: '/esim-data/flags/mc.svg', regionId: 'europe', slug: countryNameToSlug('Monaco'), plans: [] },
    { id: 'md', name: 'Moldova', flag: '🇲🇩', flagUrl: '/esim-data/flags/md.svg', regionId: 'europe', slug: countryNameToSlug('Moldova'), plans: [] },
    { id: 'me', name: 'Montenegro', flag: '🇲🇪', flagUrl: '/esim-data/flags/me.svg', regionId: 'europe', slug: countryNameToSlug('Montenegro'), plans: [] },
    { id: 'mf', name: 'Saint Martin', flag: '🇲🇫', flagUrl: '/esim-data/flags/mf.svg', regionId: 'north-america', slug: countryNameToSlug('Saint Martin'), plans: [] },
    { id: 'mg', name: 'Madagascar', flag: '🇲🇬', flagUrl: '/esim-data/flags/mg.svg', regionId: 'africa', slug: countryNameToSlug('Madagascar'), plans: [] },
    { id: 'mk', name: 'North Macedonia', flag: '🇲🇰', flagUrl: '/esim-data/flags/mk.svg', regionId: 'europe', slug: countryNameToSlug('North Macedonia'), plans: [] },
    { id: 'ml', name: 'Mali', flag: '🇲🇱', flagUrl: '/esim-data/flags/ml.svg', regionId: 'africa', slug: countryNameToSlug('Mali'), plans: [] },
    { id: 'mn', name: 'Mongolia', flag: '🇲🇳', flagUrl: '/esim-data/flags/mn.svg', regionId: 'asia', slug: countryNameToSlug('Mongolia'), plans: [] },
    { id: 'mo', name: 'Macau', flag: '🇲🇴', flagUrl: '/esim-data/flags/mo.svg', regionId: 'asia', slug: countryNameToSlug('Macau'), plans: [] },
    { id: 'mp', name: 'Northern Mariana Islands', flag: '🇲🇵', flagUrl: '/esim-data/flags/mp.svg', regionId: 'oceania', slug: countryNameToSlug('Northern Mariana Islands'), plans: [] },
    { id: 'mq', name: 'Martinique', flag: '🇲🇶', flagUrl: '/esim-data/flags/mq.svg', regionId: 'north-america', slug: countryNameToSlug('Martinique'), plans: [] },
    { id: 'mr', name: 'Mauritania', flag: '🇲🇷', flagUrl: '/esim-data/flags/mr.svg', regionId: 'africa', slug: countryNameToSlug('Mauritania'), plans: [] },
    { id: 'ms', name: 'Montserrat', flag: '🇲🇸', flagUrl: '/esim-data/flags/ms.svg', regionId: 'north-america', slug: countryNameToSlug('Montserrat'), plans: [] },
    { id: 'mt', name: 'Malta', flag: '🇲🇹', flagUrl: '/esim-data/flags/mt.svg', regionId: 'europe', slug: countryNameToSlug('Malta'), plans: [] },
    { id: 'mu', name: 'Mauritius', flag: '🇲🇺', flagUrl: '/esim-data/flags/mu.svg', regionId: 'africa', slug: countryNameToSlug('Mauritius'), plans: [] },
    { id: 'mv', name: 'Maldives', flag: '🇲🇻', flagUrl: '/esim-data/flags/mv.svg', regionId: 'asia', slug: countryNameToSlug('Maldives'), plans: [] },
    { id: 'mw', name: 'Malawi', flag: '🇲🇼', flagUrl: '/esim-data/flags/mw.svg', regionId: 'africa', slug: countryNameToSlug('Malawi'), plans: [] },

    { id: 'mz', name: 'Mozambique', flag: '🇲🇿', flagUrl: '/esim-data/flags/mz.svg', regionId: 'africa', slug: countryNameToSlug('Mozambique'), plans: [] },
    { id: 'na', name: 'Namibia', flag: '🇳🇦', flagUrl: '/esim-data/flags/na.svg', regionId: 'africa', slug: countryNameToSlug('Namibia'), plans: [] },
    { id: 'ne', name: 'Niger', flag: '🇳🇪', flagUrl: '/esim-data/flags/ne.svg', regionId: 'africa', slug: countryNameToSlug('Niger'), plans: [] },
    { id: 'ng', name: 'Nigeria', flag: '🇳🇬', flagUrl: '/esim-data/flags/ng.svg', regionId: 'africa', slug: countryNameToSlug('Nigeria'), plans: [] },
    { id: 'ni', name: 'Nicaragua', flag: '🇳🇮', flagUrl: '/esim-data/flags/ni.svg', regionId: 'north-america', slug: countryNameToSlug('Nicaragua'), plans: [] },
    { id: 'no', name: 'Norway', flag: '🇳🇴', flagUrl: '/esim-data/flags/no.svg', regionId: 'europe', slug: countryNameToSlug('Norway'), plans: [] },
    { id: 'np', name: 'Nepal', flag: '🇳🇵', flagUrl: '/esim-data/flags/np.svg', regionId: 'asia', slug: countryNameToSlug('Nepal'), plans: [] },
    { id: 'nr', name: 'Nauru', flag: '🇳🇷', flagUrl: '/esim-data/flags/nr.svg', regionId: 'oceania', slug: countryNameToSlug('Nauru'), plans: [] },
    { id: 'nz', name: 'New Zealand', flag: '🇳🇿', flagUrl: '/esim-data/flags/nz.svg', regionId: 'oceania', slug: countryNameToSlug('New Zealand'), plans: [] },
    { id: 'om', name: 'Oman', flag: '🇴🇲', flagUrl: '/esim-data/flags/om.svg', regionId: 'asia', slug: countryNameToSlug('Oman'), plans: [] },
    { id: 'pa', name: 'Panama', flag: '🇵🇦', flagUrl: '/esim-data/flags/pa.svg', regionId: 'north-america', slug: countryNameToSlug('Panama'), plans: [] },
    { id: 'pe', name: 'Peru', flag: '🇵🇪', flagUrl: '/esim-data/flags/pe.svg', regionId: 'south-america', slug: countryNameToSlug('Peru'), plans: [] },
    { id: 'pf', name: 'French Polynesia', flag: '🇵🇫', flagUrl: '/esim-data/flags/pf.svg', regionId: 'oceania', slug: countryNameToSlug('French Polynesia'), plans: [] },
    { id: 'pg', name: 'Papua New Guinea', flag: '🇵🇬', flagUrl: '/esim-data/flags/pg.svg', regionId: 'oceania', slug: countryNameToSlug('Papua New Guinea'), plans: [] },
    { id: 'ph', name: 'Philippines', flag: '🇵🇭', flagUrl: '/esim-data/flags/ph.svg', regionId: 'asia', slug: countryNameToSlug('Philippines'), plans: [] },
    { id: 'pk', name: 'Pakistan', flag: '🇵🇰', flagUrl: '/esim-data/flags/pk.svg', regionId: 'asia', slug: countryNameToSlug('Pakistan'), plans: [] },
    { id: 'pl', name: 'Poland', flag: '🇵🇱', flagUrl: '/esim-data/flags/pl.svg', regionId: 'europe', slug: countryNameToSlug('Poland'), plans: [] },
    { id: 'pr', name: 'Puerto Rico', flag: '🇵🇷', flagUrl: '/esim-data/flags/pr.svg', regionId: 'north-america', slug: countryNameToSlug('Puerto Rico'), plans: [] },
    { id: 'pt', name: 'Portugal', flag: '🇵🇹', flagUrl: '/esim-data/flags/pt.svg', regionId: 'europe', slug: countryNameToSlug('Portugal'), plans: [] },
    { id: 'py', name: 'Paraguay', flag: '🇵🇾', flagUrl: '/esim-data/flags/py.svg', regionId: 'south-america', slug: countryNameToSlug('Paraguay'), plans: [] },
    { id: 'qa', name: 'Qatar', flag: '🇶🇦', flagUrl: '/esim-data/flags/qa.svg', regionId: 'asia', slug: countryNameToSlug('Qatar'), plans: [] },
    { id: 're', name: 'Réunion', flag: '🇷🇪', flagUrl: '/esim-data/flags/re.svg', regionId: 'africa', slug: countryNameToSlug('Réunion'), plans: [] },
    { id: 'ro', name: 'Romania', flag: '🇷🇴', flagUrl: '/esim-data/flags/ro.svg', regionId: 'europe', slug: countryNameToSlug('Romania'), plans: [] },
    { id: 'rs', name: 'Serbia', flag: '🇷🇸', flagUrl: '/esim-data/flags/rs.svg', regionId: 'europe', slug: countryNameToSlug('Serbia'), plans: [] },
    { id: 'rw', name: 'Rwanda', flag: '🇷🇼', flagUrl: '/esim-data/flags/rw.svg', regionId: 'africa', slug: countryNameToSlug('Rwanda'), plans: [] },
    { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦', flagUrl: '/esim-data/flags/sa.svg', regionId: 'asia', slug: countryNameToSlug('Saudi Arabia'), plans: [] },
    { id: 'sb', name: 'Solomon Islands', flag: '🇸🇧', flagUrl: '/esim-data/flags/sb.svg', regionId: 'oceania', slug: countryNameToSlug('Solomon Islands'), plans: [] },
    { id: 'sc', name: 'Seychelles', flag: '🇸🇨', flagUrl: '/esim-data/flags/sc.svg', regionId: 'africa', slug: countryNameToSlug('Seychelles'), plans: [] },
    { id: 'sd', name: 'Sudan', flag: '🇸🇩', flagUrl: '/esim-data/flags/sd.svg', regionId: 'africa', slug: countryNameToSlug('Sudan'), plans: [] },
    { id: 'se', name: 'Sweden', flag: '🇸🇪', flagUrl: '/esim-data/flags/se.svg', regionId: 'europe', slug: countryNameToSlug('Sweden'), plans: [] },
    { id: 'si', name: 'Slovenia', flag: '🇸🇮', flagUrl: '/esim-data/flags/si.svg', regionId: 'europe', slug: countryNameToSlug('Slovenia'), plans: [] },
    { id: 'sk', name: 'Slovakia', flag: '🇸🇰', flagUrl: '/esim-data/flags/sk.svg', regionId: 'europe', slug: countryNameToSlug('Slovakia'), plans: [] },
    { id: 'sl', name: 'Sierra Leone', flag: '🇸🇱', flagUrl: '/esim-data/flags/sl.svg', regionId: 'africa', slug: countryNameToSlug('Sierra Leone'), plans: [] },
    { id: 'sm', name: 'San Marino', flag: '🇸🇲', flagUrl: '/esim-data/flags/sm.svg', regionId: 'europe', slug: countryNameToSlug('San Marino'), plans: [] },
    { id: 'sn', name: 'Senegal', flag: '🇸🇳', flagUrl: '/esim-data/flags/sn.svg', regionId: 'africa', slug: countryNameToSlug('Senegal'), plans: [] },
    { id: 'sr', name: 'Suriname', flag: '🇸🇷', flagUrl: '/esim-data/flags/sr.svg', regionId: 'south-america', slug: countryNameToSlug('Suriname'), plans: [] },
    { id: 'ss', name: 'South Sudan', flag: '🇸🇸', flagUrl: '/esim-data/flags/ss.svg', regionId: 'africa', slug: countryNameToSlug('South Sudan'), plans: [] },
    { id: 'sv', name: 'El Salvador', flag: '🇸🇻', flagUrl: '/esim-data/flags/sv.svg', regionId: 'north-america', slug: countryNameToSlug('El Salvador'), plans: [] },
    { id: 'sx', name: 'Sint Maarten', flag: '🇸🇽', flagUrl: '/esim-data/flags/sx.svg', regionId: 'north-america', slug: countryNameToSlug('Sint Maarten'), plans: [] },
    { id: 'sz', name: 'Eswatini', flag: '🇸🇿', flagUrl: '/esim-data/flags/sz.svg', regionId: 'africa', slug: countryNameToSlug('Eswatini'), plans: [] },
    { id: 'tc', name: 'Turks and Caicos Islands', flag: '🇹🇨', flagUrl: '/esim-data/flags/tc.svg', regionId: 'north-america', slug: countryNameToSlug('Turks and Caicos Islands'), plans: [] },
    { id: 'td', name: 'Chad', flag: '🇹🇩', flagUrl: '/esim-data/flags/td.svg', regionId: 'africa', slug: countryNameToSlug('Chad'), plans: [] },
    { id: 'tg', name: 'Togo', flag: '🇹🇬', flagUrl: '/esim-data/flags/tg.svg', regionId: 'africa', slug: countryNameToSlug('Togo'), plans: [] },
    { id: 'tj', name: 'Tajikistan', flag: '🇹🇯', flagUrl: '/esim-data/flags/tj.svg', regionId: 'asia', slug: countryNameToSlug('Tajikistan'), plans: [] },
    { id: 'tl', name: 'Timor-Leste', flag: '🇹🇱', flagUrl: '/esim-data/flags/tl.svg', regionId: 'asia', slug: countryNameToSlug('Timor-Leste'), plans: [] },
    { id: 'tn', name: 'Tunisia', flag: '🇹🇳', flagUrl: '/esim-data/flags/tn.svg', regionId: 'africa', slug: countryNameToSlug('Tunisia'), plans: [] },
    { id: 'to', name: 'Tonga', flag: '🇹🇴', flagUrl: '/esim-data/flags/to.svg', regionId: 'oceania', slug: countryNameToSlug('Tonga'), plans: [] },
    { id: 'tt', name: 'Trinidad and Tobago', flag: '🇹🇹', flagUrl: '/esim-data/flags/tt.svg', regionId: 'north-america', slug: countryNameToSlug('Trinidad and Tobago'), plans: [] },
    { id: 'tw', name: 'Taiwan', flag: '🇹🇼', flagUrl: '/esim-data/flags/tw.svg', regionId: 'asia', slug: countryNameToSlug('Taiwan'), plans: [] },
    { id: 'tz', name: 'Tanzania', flag: '🇹🇿', flagUrl: '/esim-data/flags/tz.svg', regionId: 'africa', slug: countryNameToSlug('Tanzania'), plans: [] },
    { id: 'ua', name: 'Ukraine', flag: '🇺🇦', flagUrl: '/esim-data/flags/ua.svg', regionId: 'europe', slug: countryNameToSlug('Ukraine'), plans: [] },
    { id: 'ug', name: 'Uganda', flag: '🇺🇬', flagUrl: '/esim-data/flags/ug.svg', regionId: 'africa', slug: countryNameToSlug('Uganda'), plans: [] },
    { id: 'us', name: 'United States', flag: '🇺🇸', flagUrl: '/esim-data/flags/us.svg', regionId: 'north-america', slug: countryNameToSlug('United States'), countryCode: 'US', plans: [] },
    { id: 'uy', name: 'Uruguay', flag: '🇺🇾', flagUrl: '/esim-data/flags/uy.svg', regionId: 'south-america', slug: countryNameToSlug('Uruguay'), plans: [] },
    { id: 'uz', name: 'Uzbekistan', flag: '🇺🇿', flagUrl: '/esim-data/flags/uz.svg', regionId: 'asia', slug: countryNameToSlug('Uzbekistan'), plans: [] },
    { id: 'vc', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', flagUrl: '/esim-data/flags/vc.svg', regionId: 'north-america', slug: countryNameToSlug('Saint Vincent and the Grenadines'), plans: [] },
    { id: 've', name: 'Venezuela', flag: '🇻🇪', flagUrl: '/esim-data/flags/ve.svg', regionId: 'south-america', slug: countryNameToSlug('Venezuela'), plans: [] },
    { id: 'vg', name: 'British Virgin Islands', flag: '🇻🇬', flagUrl: '/esim-data/flags/vg.svg', regionId: 'north-america', slug: countryNameToSlug('British Virgin Islands'), plans: [] },
    { id: 'vi', name: 'U.S. Virgin Islands', flag: '🇻🇮', flagUrl: '/esim-data/flags/vi.svg', regionId: 'north-america', slug: countryNameToSlug('U.S. Virgin Islands'), plans: [] },
    { id: 'vn', name: 'Vietnam', flag: '🇻🇳', flagUrl: '/esim-data/flags/vn.svg', regionId: 'asia', slug: countryNameToSlug('Vietnam'), plans: [] },
    { id: 'vu', name: 'Vanuatu', flag: '🇻🇺', flagUrl: '/esim-data/flags/vu.svg', regionId: 'oceania', slug: countryNameToSlug('Vanuatu'), plans: [] },
    { id: 'ws', name: 'Samoa', flag: '🇼🇸', flagUrl: '/esim-data/flags/ws.svg', regionId: 'oceania', slug: countryNameToSlug('Samoa'), plans: [] },
    { id: 'xk', name: 'Kosovo', flag: '🇽🇰', flagUrl: '/esim-data/flags/xk.svg', regionId: 'europe', slug: countryNameToSlug('Kosovo'), plans: [] },
    { id: 'yt', name: 'Mayotte', flag: '🇾🇹', flagUrl: '/esim-data/flags/yt.svg', regionId: 'africa', slug: countryNameToSlug('Mayotte'), plans: [] },
    { id: 'za', name: 'South Africa', flag: '🇿🇦', flagUrl: '/esim-data/flags/za.svg', regionId: 'africa', slug: countryNameToSlug('South Africa'), plans: [] },
    { id: 'zm', name: 'Zambia', flag: '🇿🇲', flagUrl: '/esim-data/flags/zm.svg', regionId: 'africa', slug: countryNameToSlug('Zambia'), plans: [] },
    { id: 'zw', name: 'Zimbabwe', flag: '🇿🇼', flagUrl: '/esim-data/flags/zw.svg', regionId: 'africa', slug: countryNameToSlug('Zimbabwe'), plans: [] },
];

// Main navigation countries - reduced list for better mobile experience
export const MAIN_NAV_COUNTRIES: Country[] = [
    { id: 'us', name: 'United States', flag: '🇺🇸', flagUrl: '/esim-data/flags/us.svg', regionId: 'north-america', slug: countryNameToSlug('United States'), countryCode: 'US', plans: [] },
    { id: 'gb', name: 'United Kingdom', flag: '🇬🇧', flagUrl: '/esim-data/flags/gb.svg', regionId: 'europe', slug: countryNameToSlug('United Kingdom'), countryCode: 'GB', plans: [] },
    { id: 'tr', name: 'Turkey', flag: '🇹🇷', flagUrl: '/esim-data/flags/tr.svg', regionId: 'europe', slug: countryNameToSlug('Turkey'), countryCode: 'TR', plans: [] },
    { id: 'jp', name: 'Japan', flag: '🇯🇵', flagUrl: '/esim-data/flags/jp.svg', regionId: 'asia', slug: countryNameToSlug('Japan'), countryCode: 'JP', plans: [] },
    { id: 'fr', name: 'France', flag: '🇫🇷', flagUrl: '/esim-data/flags/fr.svg', regionId: 'europe', slug: countryNameToSlug('France'), countryCode: 'FR', plans: [] },
    { id: 'cn', name: 'China', flag: '🇨🇳', flagUrl: '/esim-data/flags/cn.svg', regionId: 'asia', slug: countryNameToSlug('China'), countryCode: 'CN', plans: [] },
    { id: 'it', name: 'Italy', flag: '🇮🇹', flagUrl: '/esim-data/flags/it.svg', regionId: 'europe', slug: countryNameToSlug('Italy'), countryCode: 'IT', plans: [] },
    { id: 'es', name: 'Spain', flag: '🇪🇸', flagUrl: '/esim-data/flags/es.svg', regionId: 'europe', slug: countryNameToSlug('Spain'), countryCode: 'ES', plans: [] },
    { id: 'ae', name: 'United Arab Emirates', flag: '🇦🇪', flagUrl: '/esim-data/flags/uae.svg', regionId: 'asia', slug: countryNameToSlug('United Arab Emirates'), countryCode: 'AE', plans: [] },
    { id: 'ca', name: 'Canada', flag: '🇨🇦', flagUrl: '/esim-data/flags/canada.svg', regionId: 'north-america', slug: countryNameToSlug('Canada'), countryCode: 'CA', plans: [] },
];

// Function to generate country-specific FAQs
export const getCountryFAQs = (countryName: string, countryCode: string): FaqItem[] => {
    // This function will be replaced by a translation-based approach
    // The actual FAQ content will be loaded from translation files
    return [];
};

// New function that uses translations
export const getTranslatedCountryFAQs = (countryName: string, countryCode: string, t: any, plansData?: any): FaqItem[] => {
    // Helper to always read from the "faq" namespace
    const f = (key: string, options: any = {}) => t(key, { ns: 'faq', ...options });

    // Helper function to get lowest price for a country
    const getLowestPrice = (countryCode: string, plans: any[]) => {
        if (!plans || !plans.length) return null;
        
        // Convert country code to uppercase to match plans data format
        const upperCountryCode = countryCode.toUpperCase();
        
        const countryPlans = plans.filter((plan: any) => 
            plan.covered_countries.includes(upperCountryCode)
        );
        
        if (!countryPlans.length) return null;
        
        const lowestPlan = countryPlans.reduce((lowest: any, current: any) => {
            const currentPrice = current.price?.amount_with_tax || 0;
            const lowestPrice = lowest.price?.amount_with_tax || Infinity;
            return currentPrice < lowestPrice ? current : lowest;
        });
        
        if (lowestPlan?.price) {
            const currency = lowestPlan.price.currency || 'USD';
            const amount = lowestPlan.price.amount_with_tax;
            
            // Handle different data structures
            let dataAmount = 1;
            let dataUnit = 'GB';
            
            if (lowestPlan.data_limit) {
                // New structure with data_limit
                dataAmount = lowestPlan.data_limit.amount;
                dataUnit = lowestPlan.data_limit.unit;
            } else if (lowestPlan.data_amount) {
                // Old structure with data_amount
                dataAmount = lowestPlan.data_amount;
                dataUnit = lowestPlan.data_unit || 'GB';
            }
            
            // Convert amount from cents to dollars if needed
            const displayAmount = amount >= 100 ? (amount / 100).toFixed(2) : amount.toFixed(2);
            
            if (currency === 'USD') {
                return `$${displayAmount} USD за ${dataAmount} ${dataUnit}`;
            }
            return `${displayAmount} ${currency} за ${dataAmount} ${dataUnit}`;
        }
        
        return null;
    };

    const baseFAQs: FaqItem[] = [
        {
            question: f('what_is_esim.question'),
            answer: f('what_is_esim.answer')
        },
        {
            question: f('how_to_get_esim.question'),
            answer: f('how_to_get_esim.answer')
        },
        {
            question: f('esim_vs_regular.question'),
            answer: f('esim_vs_regular.answer')
        },
        {
            question: f('device_compatibility.question', { country: countryName }),
            answer: f('device_compatibility.answer')
        },
        {
            question: f('data_plan_cost.question', { country: countryName }),
            answer: (() => {
                let answer = f('data_plan_cost.answer');
                if (plansData?.items && answer.includes('{lowest-price}')) {
                    console.log(`FAQ: Processing pricing for country ${countryCode}, plans data available:`, plansData.items.length);
                    const lowestPrice = getLowestPrice(countryCode, plansData.items);
                    console.log(`FAQ: Lowest price for ${countryCode}:`, lowestPrice);
                    if (lowestPrice) {
                        answer = answer.replace('{lowest-price}', lowestPrice);
                    } else {
                        // Fallback if no pricing data is available
                        // Check if the answer is in Bulgarian or English and provide appropriate fallback
                        if (answer.includes('за')) {
                            // Bulgarian text
                            answer = answer.replace('{lowest-price}', 'конкурентни цени');
                        } else {
                            // English text
                            answer = answer.replace('{lowest-price}', 'competitive rates');
                        }
                    }
                }
                return answer;
            })()
        },
        {
            question: f('esim_downsides.question'),
            answer: f('esim_downsides.answer')
        },

        {
            question: f('esim_safety.question'),
            answer: f('esim_safety.answer')
        },
        {
            question: f('esim_not_working.question'),
            answer: f('esim_not_working.answer')
        },
        {
            question: f('battery_usage.question'),
            answer: f('battery_usage.answer')
        },
        {
            question: f('phone_number.question'),
            answer: f('phone_number.answer')
        },
        {
            question: f('esim_phone_number.question'),
            answer: f('esim_phone_number.answer')
        },
        {
            question: f('unlimited_data.question', { country: countryName }),
            answer: f('unlimited_data.answer', { country: countryName })
        }
    ];

    // Add country-specific variations based on region
    const country = COUNTRIES.find(c => c.id === countryCode);
    if (country) {
        const region = REGIONS.find(r => r.id === country.regionId);
        if (region) {
            // Add region-specific customizations
            if (region.id === 'asia') {
                // Add Asia-specific FAQ about language support
                baseFAQs.push({
                    question: f('language_support.question'),
                    answer: f('language_support.answer')
                });
            }
        }
    }

    return baseFAQs;
};

// Default FAQs (fallback)
export const FAQS: FaqItem[] = getCountryFAQs("your destination", "default");

export const BASE_URL = 'https://travelesim.bg';

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "The eSIM was a lifesaver on my trip to Japan. Activated in minutes and the speed was fantastic. Will never go back to physical SIMs!",
        name: "Sophie Chen",
        location: "Digital Nomad",
        avatarUrl: "https://picsum.photos/seed/sophie/100/100",
        rating: 5
    },
    {
        quote: "I used GlobalConnect for my backpacking trip across Europe. Flawless connection in every country. So much easier than buying a new SIM at every border.",
        name: "Liam Gallagher",
        location: "Student Traveler",
        avatarUrl: "https://picsum.photos/seed/liam/100/100",
        rating: 5
    },
    {
        quote: "As a business traveler, reliable internet is non-negotiable. This service is fast, affordable, and incredibly convenient. Highly recommended.",
        name: "Maria Rodriguez",
        location: "Sales Director",
        avatarUrl: "https://picsum.photos/seed/maria/100/100",
        rating: 4
    }
];
