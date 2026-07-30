import type { Domain, Question } from './types'

type LegacySeed = readonly [
  string,
  readonly [string, string, string, string],
  number,
  string,
]

type LegacyDomainId = Extract<Domain['id'], `legacy-${string}`>

const legacySeeds: Record<LegacyDomainId, readonly LegacySeed[]> = {
  'legacy-xvsf': [
    [
      'What can you spend a Level 1 Hyper Combo Gauge on?',
      [
        'A Hyper Combo',
        'A Cross-Over Combination',
        'A second reserve character',
        'A game-version change',
      ],
      0,
      'The official manual makes Hyper Combos available from Level 1.',
    ],
    [
      'What gauge level is required for a Cross-Over Combination?',
      ['No gauge', 'Level 1', 'Level 2 or more', 'Level 3 only'],
      2,
      'Cross-Over Combinations become available at Level 2.',
    ],
    [
      'What happens to a healthy reserve character while inactive?',
      [
        'Their recoverable health returns',
        'Their gauge resets',
        'They lose health',
        'They cannot re-enter',
      ],
      0,
      'The reserve character regains health while inactive.',
    ],
    [
      'What is the basic purpose of a Cross-Over Attack?',
      [
        'Launch the opponent',
        'Swap the controlled character',
        'Use both Hyper Combos',
        'Push the opponent away',
      ],
      1,
      'A Cross-Over Attack changes which team member is controlled.',
    ],
    [
      'When is a Cross-Over Counter performed?',
      [
        'During a super jump',
        'While guarding an attack',
        'After the timer ends',
        'Only after a KO',
      ],
      1,
      'It is a gauge-spending counter performed while guarding.',
    ],
    [
      'What starts the route into an Air Combo?',
      [
        'A throw recovery',
        'An attack that launches the opponent',
        'A backward dash',
        'A Cross-Over Counter',
      ],
      1,
      'An Air Combo Starter launches the opponent before the pursuit.',
    ],
    [
      'What order defines a basic Chain Combo?',
      [
        'Heavy to medium to light',
        'Kick to punch only',
        'Light to medium to heavy',
        'Any three throws',
      ],
      2,
      'The manual defines the chain as light, then medium, then heavy.',
    ],
    [
      'How does Turbo mode differ from Normal mode?',
      [
        'Characters move much faster',
        'Teams have three characters',
        'Guard is disabled',
        'Gauge cannot build',
      ],
      0,
      'Turbo mode increases character speed.',
    ],
    [
      'What assistance does Auto mode provide?',
      [
        'Infinite gauge',
        'Automatic guarding and an assisted Air Combo start',
        'Automatic team selection',
        'Unlimited reserve health',
      ],
      1,
      'Auto mode guards automatically and assists the starter-to-super-jump sequence.',
    ],
    [
      'Which game version does the collection use for ranked and casual matches?',
      ['960910', '961004', '961023', 'Every match chooses randomly'],
      2,
      'The official collection manual fixes ranked and casual play to version 961023.',
    ],
  ],
  'legacy-mshvsf': [
    [
      'Which control types can be selected in this game?',
      [
        'Normal and Turbo',
        'Manual and Easy',
        'Classic and Modern',
        'Solo and Tag',
      ],
      1,
      'The official manual lists Manual and Easy control types.',
    ],
    [
      'What does a Cross-Over Assist do?',
      [
        'Swaps stages',
        'Summons the reserve character for an attack',
        'Ends the round',
        'Refills the full health bar',
      ],
      1,
      'The assist calls the reserve character to attack without making them the controlled fighter.',
    ],
    [
      'What is the purpose of Advancing Guard?',
      [
        'Build Level 2 instantly',
        'Put distance between the fighters',
        'Launch the opponent',
        'Swap characters',
      ],
      1,
      'Advancing Guard pushes the opponent away while defending.',
    ],
    [
      'What gauge level enables a Cross-Over Combination?',
      ['Level 1', 'Level 2 or more', 'Level 3 only', 'No gauge'],
      1,
      'The team combination requires Level 2 or more.',
    ],
    [
      'When do character-specific Hyper Combos become available?',
      ['At Level 1', 'At Level 2', 'Only at maximum gauge', 'Only after a tag'],
      0,
      'Hyper Combos are available from Level 1.',
    ],
    [
      'What prevents reserve-character team actions?',
      [
        'The reserve character is KO’d',
        'The timer is below 50',
        'The player dashed',
        'The opponent is airborne',
      ],
      0,
      'Cross-over actions cannot use a reserve character who has been KO’d.',
    ],
    [
      'When should a Safe Fall input be made?',
      [
        'Before landing after being knocked away',
        'Before character select',
        'During a Hyper Combo',
        'After the round ends',
      ],
      0,
      'Safe Fall is performed before landing from a knock-away.',
    ],
    [
      'After an Air Combo Starter connects, what is the next goal?',
      [
        'Pause immediately',
        'Pursue the launched opponent',
        'Call the reserve and stand still',
        'Spend every gauge level',
      ],
      1,
      'The starter creates a pursuit opportunity for airborne follow-ups.',
    ],
    [
      'Which progression describes a Chain Combo?',
      [
        'Light, medium, heavy',
        'Heavy, light, medium',
        'Throw, dash, taunt',
        'Any attacks simultaneously',
      ],
      0,
      'Chain Combos progress from light to medium to heavy attacks.',
    ],
    [
      'Why might you swap out a damaged but living character?',
      [
        'Inactive reserve health can recover',
        'They immediately win the round',
        'Their gauge becomes unlimited',
        'The opponent loses their assist',
      ],
      0,
      'A reserve character can regain recoverable health while inactive.',
    ],
  ],
  'legacy-mvc1': [
    [
      'What limits how often a Special Partner can be summoned?',
      [
        'The round number',
        'A displayed number of uses',
        'The Hyper Combo level',
        'The reserve health bar',
      ],
      1,
      'The game screen tracks a limited number of Special Partner uses.',
    ],
    [
      'What does a Duo Team Attack let you do?',
      [
        'Control both team characters at once',
        'Choose a third main character',
        'Change the game version',
        'Recover a KO’d partner',
      ],
      0,
      'Duo Team Attack temporarily gives control of both main characters.',
    ],
    [
      'What special resource benefit applies during a Duo Team Attack?',
      [
        'Health cannot decrease',
        'Hyper Combos can be used without a numeric limit',
        'Special Partner uses reset',
        'The timer stops',
      ],
      1,
      'The official manual allows an unlimited number of Hyper Combos while the Duo Team Attack is active.',
    ],
    [
      'When can a Special Partner normally be summoned?',
      [
        'While your character is grounded',
        'Only while KO’d',
        'Only during character select',
        'Only after a throw',
      ],
      0,
      'The Special Partner command is available while grounded.',
    ],
    [
      'What does a Cross-Over Attack change?',
      [
        'The controlled team character',
        'The Special Partner’s use limit',
        'The stage',
        'The match version',
      ],
      0,
      'Cross-Over Attack swaps the active and reserve team characters.',
    ],
    [
      'What is the minimum gauge level for a standard Hyper Combo?',
      ['Level 0', 'Level 1', 'Level 2', 'Level 3'],
      1,
      'Standard Hyper Combos become available at Level 1.',
    ],
    [
      'What is the minimum gauge level for a Cross-Over Combination?',
      ['Level 1', 'Level 2', 'Level 3', 'No gauge is required'],
      1,
      'The team Hyper Combo combination requires Level 2 or more.',
    ],
    [
      'Which defensive system creates space while guarding?',
      [
        'Advancing Guard',
        'Duo Team Attack',
        'Special Partner',
        'Air Combo Starter',
      ],
      0,
      'Advancing Guard pushes the opponent away.',
    ],
    [
      'What should follow a successful Air Combo Starter?',
      [
        'An aerial pursuit',
        'A game-version change',
        'A Special Partner selection',
        'A quick save',
      ],
      0,
      'The starter launches the opponent so the attacker can pursue.',
    ],
    [
      'What condition disables Duo Team Attack and other reserve-dependent actions?',
      [
        'The reserve character is KO’d',
        'The active character has full health',
        'The player used Advancing Guard',
        'The timer is above 50',
      ],
      0,
      'Reserve-dependent team actions require a living reserve character.',
    ],
  ],
  'legacy-tekken2': [
    [
      'Whose story focus moved to the center in Tekken 2?',
      ['Heihachi Mishima', 'Jin Kazama', 'Lili', 'Armor King'],
      0,
      'The sequel shifted focus to Heihachi, the deposed patriarch and prior villain.',
    ],
    [
      'Which pair debuted in Tekken 2 according to PlayStation’s series history?',
      [
        'Lili and Dragunov',
        'Jun Kazama and Lei Wulong',
        'Asuka and Feng',
        'Jin and Hwoarang',
      ],
      1,
      'Jun and Lei are identified as fresh faces introduced in Tekken 2.',
    ],
    [
      'What encouraged arcade players to return over time?',
      [
        'Additional characters unlocked over time',
        'Weekly paid stages',
        'A tag-only ladder',
        'Daily Hyper Combos',
      ],
      0,
      'The arcade release progressively unlocked more characters.',
    ],
    [
      'When did the improved PlayStation port arrive?',
      ['1994', '1995', '1996', '2000'],
      2,
      'PlayStation’s history dates the home port to 1996.',
    ],
    [
      'Which presentation feature helped establish the series’ cinematic reputation?',
      [
        'CG intro and ending movies',
        'A live-action tutorial',
        'Online replays',
        'A seasonal battle pass',
      ],
      0,
      'The PlayStation-exclusive CG intro and endings were a major showcase.',
    ],
    [
      'Which mode was added to the PlayStation version?',
      ['Team Battle', 'Tekken Dojo', 'Scenario Campaign', 'Devil Within'],
      0,
      'Team Battle was one of several modes added to the PlayStation port.',
    ],
    [
      'Which set contains only modes documented as Tekken 2 additions?',
      [
        'Time Attack, Survival, Practice',
        'Gold Rush, Dojo, Bowl',
        'Scenario Campaign, Rage, Bound',
        'Story Battle, Ghost Share, Tag Assault',
      ],
      0,
      'Time Attack, Survival, and Practice joined Team Battle in the PlayStation version.',
    ],
    [
      'Why is Tekken 2 not covered by calling it a tag game?',
      [
        'Team Battle is a mode, not in-round two-character swapping',
        'It has no selectable characters',
        'It is a 2D game',
        'It uses three-character teams',
      ],
      0,
      'PlayStation’s history separately describes Tag Tournament as forming a two-fighter team and swapping during battle.',
    ],
    [
      'Which game later added sidestep dodges for every character?',
      [
        'Tekken 2',
        'Tekken 3',
        'Tekken Tag Tournament',
        'Tekken 5: Dark Resurrection',
      ],
      1,
      'The series history identifies universal sidestep dodges as a Tekken 3 addition.',
    ],
    [
      'What stage-boundary model applied before Tekken 4 introduced walls and obstacles?',
      [
        'Infinite stages without set boundaries',
        'Only square arenas',
        'Breakable floors in every stage',
        'Mandatory wall starts',
      ],
      0,
      'The official history says stages before Tekken 4 had no set boundaries.',
    ],
  ],
  'legacy-t5dr': [
    [
      'Dark Resurrection began as a revision of which game?',
      ['Tekken 2', 'Tekken 4', 'Tekken 5', 'Tekken Tag Tournament 2'],
      2,
      'PlayStation’s history describes Dark Resurrection as a 2006 arcade revision of Tekken 5.',
    ],
    [
      'Which newcomers were introduced in Dark Resurrection?',
      ['Lili and Dragunov', 'Jun and Lei', 'Asuka and Feng', 'Lars and Alisa'],
      0,
      'Lili and Dragunov debuted with the Dark Resurrection revision.',
    ],
    [
      'Which returning character receives a highlighted story in the current release description?',
      ['Armor King', 'Gon', 'Jinpachi', 'Akuma'],
      0,
      'The official PlayStation Store description highlights Armor King alongside the newcomers.',
    ],
    [
      'What platform received the first home port in 2006?',
      ['PlayStation 2', 'PSP', 'PlayStation 3', 'PlayStation Vita'],
      1,
      'The first port arrived on PSP in mid-2006.',
    ],
    [
      'What was the purpose of Tekken Dojo’s shared ghosts?',
      [
        'Let others download and battle AI versions of player behavior',
        'Replace character customization',
        'Unlock every ending immediately',
        'Change arcade revisions',
      ],
      0,
      'Tekken Dojo supported sharing AI-controlled ghosts modeled on player behavior.',
    ],
    [
      'Which mode rewards dealing big damage with currency?',
      ['Gold Rush', 'Practice', 'Story Battle', 'Arcade Battle'],
      0,
      'The official store description connects Gold Rush with earning currency through big damage.',
    ],
    [
      'Which side activity appears in Dark Resurrection?',
      ['Tekken Bowl', 'Tekken Force', 'Scenario Campaign', 'The Punisher'],
      0,
      'Tekken Bowl is included among the PSP version’s modes.',
    ],
    [
      'What can fight money be used for?',
      [
        'Character customization items',
        'Changing the game’s publisher',
        'Adding a third team member',
        'Skipping every battle',
      ],
      0,
      'Fight money purchases cosmetic customization items.',
    ],
    [
      'Which group lists core fighting modes in the official release description?',
      [
        'Story Battle, Quick Battle, Arcade Battle, Practice',
        'Team Battle, Time Attack, Survival, Practice',
        'Scenario Campaign, Ghost Battle, Rage Mode, Bound Mode',
        'Ranked only',
      ],
      0,
      'Those four modes are explicitly listed for Dark Resurrection.',
    ],
    [
      'What arrived in the 2007 update to the downloadable PlayStation Network version?',
      [
        'Online matches',
        'Universal sidesteps',
        'Team Battle',
        'The first CG endings',
      ],
      0,
      'PlayStation’s history says a mid-2007 update added online matches.',
    ],
  ],
}

export const legacyDomains: readonly Domain[] = [
  {
    id: 'legacy-xvsf',
    trackId: 'world-warrior',
    title: 'X-Men vs. Street Fighter',
    description: 'Cross-over attacks, counters, combinations, and air routes.',
  },
  {
    id: 'legacy-mshvsf',
    trackId: 'world-warrior',
    title: 'Marvel Super Heroes vs. Street Fighter',
    description: 'Reserve assists, advancing guard, and team-resource choices.',
  },
  {
    id: 'legacy-mvc1',
    trackId: 'world-warrior',
    title: 'Marvel vs. Capcom 1',
    description: 'Special Partners, Duo Team Attack, and cross-over systems.',
  },
  {
    id: 'legacy-tekken2',
    trackId: 'iron-fist',
    title: 'Tekken 2',
    description:
      'The solo sequel, its modes, roster history, and era-specific systems.',
  },
  {
    id: 'legacy-t5dr',
    trackId: 'iron-fist',
    title: 'Tekken 5: Dark Resurrection',
    description:
      'The Tekken 5 revision, Dojo ghosts, modes, and customization.',
  },
]

const legacySourceIds: Record<LegacyDomainId, Question['sourceId']> = {
  'legacy-xvsf': 'capcom-xvsf',
  'legacy-mshvsf': 'capcom-mshvsf',
  'legacy-mvc1': 'capcom-mvc1',
  'legacy-tekken2': 'playstation-tekken-history',
  'legacy-t5dr': 'playstation-t5dr',
}

export const legacyQuestions: readonly Question[] = legacyDomains.flatMap(
  (domain) =>
    legacySeeds[domain.id as LegacyDomainId].map(
      ([prompt, choices, correctIndex, rationale], index) => ({
        id: `${domain.id}-${String(index + 1).padStart(2, '0')}`,
        trackId: domain.trackId,
        domainId: domain.id,
        prompt,
        choices,
        correctIndex,
        rationale,
        sourceId: legacySourceIds[domain.id as LegacyDomainId],
        reviewedAt: '2026-07-28',
        rights: 'original-demo-copy',
      }),
    ),
)
