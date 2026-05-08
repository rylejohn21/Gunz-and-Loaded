export const carouselSlides = [
    { src: "logoremover_1772374107178.png", alt: "Event 1" },
    { src: "logoremover_1772374154641.png", alt: "Event 2" },
    { src: "logoremover_1772374018026.jpeg", alt: "Event 3" },
    { src: "bg.png", alt: "Event 4" }
];

export const siteSections = [
    {
        id: "home",
        classes: "tab-content active tab-panel panel-home",
        heading: "INTEL BRIEFING",
        carousel: true,
        items: [
            {
                title: "DMZ: Recon Updates",
                media: { type: "image", src: "logoremover_1772288948386.jpeg", alt: "DMZ Recon Updates" },
                text: "Enemy reinforcements have landed near a missile site. When this new event appears, it's up to you and your squad to clear out the foes stationed around multiple possible marked sites in order to activate the nearby computer and launch a missile at the moving train. Time will be of the essence as destroying the train will alert every player in the match. Get there ASAP to claim the goods on the smoldering train, including a special package that can be lockpicked for high quality loot."
            },
            {
                title: "New Battle Royale LTM: Plunder",
                media: { type: "image", src: "CODM-S2-LUNARCHARGE-003.webp", alt: "New Battle Royale LTM: Plunder" },
                text: "The long awaited, fan-favorite Plunder makes its Call of Duty: Mobile debut as a new BR mode available for all of Season 2. Drop into Isolated as a trio and fight to be the first squad to accumulate $1 million."
            },
            {
                title: "New Multiplayer Map Variant: Shipment",
                media: { type: "image", src: "CODM-S2-LUNARCHARGE-004.webp", alt: "New Multiplayer Map Variant: Shipment" },
                text: "The Lunar New Year arrives in Shipment in a new holiday-themed map variant. Head to the infamous locale now featuring an assortment of red and gold tones along with new lighting, falling snow, and festive decorations including firecrackers, Spring Festival couplets, and other themed content placed throughout the map. Live in-game on launch until 2/25 (UTC)."
            },
            {
                title: "Secret Cache Update: New Mythic & Event",
                media: { type: "image", src: "CODM-S2-LUNARCHARGE-007.webp", alt: "Secret Cache Update: New Mythic & Event" },
                text: "Get some extra help with Secret Caches this season with Cache Streak. Earn bonus rewards for opening Secret Caches, which change every day. Build up a daily streak to earn Epic Weapons, an Epic Operator, and more."
            },
            {
                title: "Premium Pass Tiers",
                media: { type: "image", src: "CODM-S2-LUNARCHARGE-010.webp", alt: "Premium Pass Tiers" },
                text: "Purchase the Premium Pass for the chance to earn all the content in the Lunar Charge stream, including Operator Skins like Park - VNN Field Reporter, Stitch - The Butcher of Zordaya, Isabella - Puno, and a Sliver Good Fortune. Access hard-hitting Weapon Blueprints like the DLQ33 - Aftermath, PP19 - Headliner, SKS - Prison Break, and the Lachman-556 - Full Steam, based on the new Season 2 weapon."
            }
        ],
        footerImage: "footer.png"
    },
    {
        id: "guns",
        classes: "tab-content tab-panel panel-guns",
        hero: {
            kicker: "Elite Arsenal",
            title: "THE NEW ARSENAL",
            text: "Weapon intel is now presented like a live armory showcase with stronger visuals, quick role callouts, and a more premium tactical layout."
        },
        items: [
            {
                title: "M4",
                media: { type: "image", src: "M4.png", alt: "M4 Weapon" },
                features: ["Medium Range", "Primary", "Automatic"],
                text: "Fully automatic assault rifle. Medium range with high accuracy."
            },
            {
                title: "M21 EBR",
                media: { type: "image", src: "M21EBR.png", alt: "M21EBR Weapon" },
                features: ["Long Range", "Primary", "Semi-Automatic"],
                text: "Semi-automatic sniper rifle. Higher rate of fire with better stability."
            },
            {
                title: "Striker",
                media: { type: "image", src: "Striker.png", alt: "Striker Weapon" },
                features: ["Short Range", "Medium Range", "Primary", "Automatic"],
                text: "Semi-automatic shotgun with higher accuracy at medium and close range."
            },
            {
                title: "SMRS",
                media: { type: "image", src: "SMRS.png", alt: "SMRS Weapon" },
                features: ["Medium Range", "Long Range", "Secondary", "Single"],
                text: "Disposable rocket launcher that fires without the need to lock onto targets."
            },
            {
                title: "PDW-57",
                media: { type: "image", src: "PDW57.png", alt: "PDW-57 Weapon" },
                features: ["Precision", "Power", "Mobility"],
                text: "Fully automatic personal defense weapon. Increased range and large ammo capacity."
            }
        ],
        footerImage: "footer.png"
    },
    {
        id: "mode",
        classes: "tab-content tab-panel panel-mode",
        heading: "MODES",
        items: [
            {
                title: "Multiplayer",
                media: { type: "video", src: "Multi_10s.mp4" },
                text: "Fast paced action and close quarters combat. Players enter fan-favourite maps from classic Call of Duty games and battle it out. Scorestreaks that could make or break the upperhand. Detailed weapon customization, game changing perks to change players playstyle and more."
            },
            {
                title: "Battle Royale",
                media: { type: "video", src: "BR_10s.mp4" },
                text: "Huge 100 player map that players fight for the #1 spot. Solos, duos and squads fit right in here. Tons of weapons and attachments for players to find. Traverse the huge map with a variety of vehicles that are spawned on the map. Pick a class to give yourself an edge over the enemy."
            }
        ],
        footerImage: "footer.png"
    },
    {
        id: "draw",
        classes: "tab-content tab-panel panel-draw",
        heading: "NEW DRAW",
        items: [
            {
                title: "Galaxy Scourge Draw",
                media: {
                    type: "stacked",
                    embed: "https://www.youtube.com/embed/yYJzi0Mwl_I",
                    embedTitle: "Call of Duty Mobile - Galaxy Scourge Mythic Drop Trailer",
                    imageSrc: "Galaxy Scourge.jpg"
                }
            },
            {
                title: "Flatline Draw",
                media: {
                    type: "stacked",
                    embed: "https://www.youtube.com/embed/UG3zoKMoRBY",
                    embedTitle: "Call of Duty Mobile - Flatline Draw Trailer",
                    imageSrc: "Flatline.jpg"
                }
            },
            {
                title: "Heavenly Ink Draw",
                media: {
                    type: "stacked",
                    embed: "https://www.youtube.com/embed/8Ej447OgCEU",
                    embedTitle: "Call of Duty Mobile - Dawn of the Horse Draw Trailer",
                    imageSrc: "Heavenly Ink.jpg"
                }
            },
            {
                title: "Unhinged Jokester Draw",
                media: {
                    type: "stacked",
                    embed: "https://www.youtube.com/embed/CmCBhdj5NO4",
                    embedTitle: "Call of Duty Mobile - Unhinged Jokester",
                    imageSrc: "Unhinged Jokester.jpg"
                }
            },
            {
                title: "Parasite Draw",
                media: {
                    type: "stacked",
                    embed: "https://www.youtube.com/embed/29RGrN24RCA",
                    embedTitle: "Call of Duty Mobile - Critical Parasite Draw Trailer",
                    imageSrc: "Parasite.jpg"
                }
            }
        ],
        footerImage: "footer.png"
    },
    {
        id: "download",
        classes: "tab-content tab-panel panel-download utility-panel",
        hero: {
            kicker: "Mission Access",
            title: "DOWNLOAD",
            text: "Choose your platform and deploy directly into the latest operations."
        },
        utility: {
            type: "download",
            items: [
                {
                    href: "https://play.google.com/store/apps/details?id=com.activision.callofduty.shooter&hl=en-US",
                    classes: "action-card android",
                    label: "Android",
                    meta: "Google Play Store",
                    external: true
                },
                {
                    href: "https://apps.apple.com/ph/app/call-of-duty-mobile-garena/id1465688043",
                    classes: "action-card apple",
                    label: "Apple",
                    meta: "App Store",
                    external: true
                }
            ]
        },
        footerImage: "footer.png"
    },
    {
        id: "contact",
        classes: "tab-content tab-panel panel-contact utility-panel",
        hero: {
            kicker: "Field Support",
            title: "CONTACT",
            text: "Use the fast channels below to reach support, squad coordination, or page assistance."
        },
        utility: {
            type: "contact",
            items: [
                {
                    href: "mailto:codmsmpsupport.zendesk.com",
                    classes: "action-card contact-mail",
                    label: "Email Support",
                    meta: "codmsmpsupport.zendesk.com"
                },
                {
                    href: "https://www.facebook.com/garenacodmPH",
                    classes: "action-card contact-social",
                    label: "Social Channel",
                    meta: "Open community page",
                    external: true
                }
            ]
        },
        footerImage: "footer.png"
    },
    {
        id: "topup",
        classes: "tab-content tab-panel panel-topup utility-panel",
        hero: {
            kicker: "Combat Credits",
            title: "TOP UP",
            text: "Quick-launch top up options."
        },
        utility: {
            type: "topup",
            items: [
                {
                    href: "https://www.codashop.com/",
                    classes: "action-card topup-codashop",
                    label: "Codashop",
                    meta: "Fastest Top up Website",
                    external: true
                },
                {
                    href: "https://www.garena.com/",
                    classes: "action-card topup-garena",
                    label: "Garena",
                    meta: "Official Top up Website",
                    external: true
                }
            ]
        },
        footerImage: "footer.png"
    }
];
