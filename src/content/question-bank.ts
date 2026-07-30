import type {
  Domain,
  DomainId,
  Question,
  Track,
  TrackId,
  TrialDefinition,
} from './types'
import { legacyDomains, legacyQuestions } from './legacy-question-bank'
import { supplementalQuestions } from './supplemental-question-bank'

type SourceId = Question['sourceId']
type CoreDomainId = Exclude<DomainId, `legacy-${string}`>
type Seed = readonly [
  string,
  readonly [string, string, string, string],
  number,
  string,
  SourceId,
]

const domainSeeds: Record<CoreDomainId, readonly Seed[]> = {
  'ww-control': [
    [
      'When your character changes sides, what happens to a forward input?',
      [
        'It stays screen-right',
        'It becomes the direction the character faces',
        'It becomes down',
        'It stops working',
      ],
      1,
      'Forward is facing-relative, so it changes when sides change.',
      'capcom-controls',
    ],
    [
      'What best separates a normal attack from a special move?',
      [
        'Normals always use meter',
        'Specials use a defined command input',
        'Normals cannot be blocked',
        'Specials always launch',
      ],
      1,
      'Special moves are distinguished by their command inputs, not guaranteed outcomes.',
      'capcom-controls',
    ],
    [
      'A charge command asks the player to do what first?',
      [
        'Mash every button',
        'Hold a direction for a short time',
        'Jump twice',
        'Spend all meter',
      ],
      1,
      'Charge moves require holding the listed direction before completing the command.',
      'capcom-controls',
    ],
    [
      'What does canceling an attack usually mean?',
      [
        'Pausing the match',
        'Interrupting its recovery with an allowed follow-up',
        'Deleting its damage',
        'Switching controllers',
      ],
      1,
      'A cancel transitions from one action into an allowed follow-up before normal recovery ends.',
      'capcom-offense',
    ],
    [
      'Your motion input is unreliable. What is the best first adjustment?',
      [
        'Input faster at any cost',
        'Practice a clean, consistent motion',
        'Hold every button',
        'Only try it while jumping',
      ],
      1,
      'Consistency starts with clean inputs before speed is added.',
      'capcom-controls',
    ],
    [
      'What does an attack-strength label communicate?',
      [
        'The player rank',
        'Which version of an attack button to use',
        'The round timer',
        'The stage size',
      ],
      1,
      'Strength labels identify the intended attack button or move version.',
      'capcom-controls',
    ],
    [
      'A command shows two buttons joined together. What should you try?',
      [
        'Press them at the same time',
        'Press only the first',
        'Hold back forever',
        'Wait one round',
      ],
      0,
      'Joined button notation generally calls for a simultaneous input.',
      'capcom-controls',
    ],
    [
      'Which input commonly puts a grounded character into a crouching state?',
      ['Up', 'Down', 'Start', 'No direction'],
      1,
      'Holding down produces the crouching state in conventional controls.',
      'capcom-controls',
    ],
    [
      'Where should you confirm an unfamiliar move command?',
      [
        'A random old clip',
        'The current game command list',
        'The scoreboard',
        'A stage background',
      ],
      1,
      'The current command list is the safest version-specific reference.',
      'capcom-controls',
    ],
    [
      'A guide and your game disagree about an input. What should you check first?',
      [
        'Controller color',
        'Game and patch version',
        'Opponent name',
        'Music volume',
      ],
      1,
      'Commands can change between games or versions, so verify the exact version.',
      'capcom-controls',
    ],
  ],
  'ww-defense': [
    [
      'What is the usual first defensive input against a grounded attack?',
      [
        'Hold away from the opponent',
        'Hold toward the opponent',
        'Press pause',
        'Jump every time',
      ],
      0,
      'Holding away is the baseline standing guard input.',
      'capcom-controls',
    ],
    [
      'Why learn both standing and crouching guard?',
      [
        'They cover different attack levels',
        'One adds score',
        'One removes recovery',
        'They are identical',
      ],
      0,
      'Attack levels create different defensive answers.',
      'capcom-offense',
    ],
    [
      'Why are throws a threat to a player who only blocks?',
      [
        'Throws can challenge passive guard at close range',
        'Throws are projectiles',
        'Throws stop the timer',
        'Throws work from any distance',
      ],
      0,
      'Close-range throws discourage relying on guard alone.',
      'capcom-offense',
    ],
    [
      'What is the purpose of an anti-air response?',
      [
        'Challenge an airborne approach',
        'Build a combo menu',
        'Change the stage',
        'Recover health',
      ],
      0,
      'Anti-airs contest predictable airborne approaches.',
      'capcom-offense',
    ],
    [
      'After blocking an unfamiliar sequence, what is the safest learning goal?',
      [
        'Identify when the pressure actually ends',
        'Always press immediately',
        'Never move again',
        'Guess the opponent rank',
      ],
      0,
      'Recognizing the end of pressure prevents blind challenges.',
      'capcom-offense',
    ],
    [
      'Why save a defensive resource for a bad position?',
      [
        'It may create space or end pressure',
        'It changes the soundtrack',
        'It hides the timer',
        'It guarantees a perfect round',
      ],
      0,
      'Defensive resources can help escape pressure, but are never a universal guarantee.',
      'capcom-offense',
    ],
    [
      'You keep getting hit after wake-up. What should you vary deliberately?',
      [
        'Guard, movement, and reversal timing',
        'Display brightness',
        'Stage selection only',
        'Controller cable length',
      ],
      0,
      'A small set of deliberate defensive choices is easier to evaluate than panic inputs.',
      'capcom-offense',
    ],
    [
      'What makes repeated jumping easier to defend?',
      [
        'It creates a recognizable approach pattern',
        'It disables blocking',
        'It freezes meter',
        'It changes the rules',
      ],
      0,
      'Repeated routes become predictable and invite prepared responses.',
      'capcom-offense',
    ],
    [
      'Why review a defensive mistake after the round?',
      [
        'To name the situation and train a response',
        'To erase the loss',
        'To change the opponent',
        'To earn currency',
      ],
      0,
      'Specific review turns a vague mistake into a repeatable practice target.',
      'capcom-offense',
    ],
    [
      'What is a good response when you do not recognize an opponent option?',
      [
        'Record it and reproduce it in training',
        'Assume it is unbeatable',
        'Mash every button',
        'Quit immediately',
      ],
      0,
      'Reproduction lets you test reliable defenses instead of guessing.',
      'capcom-offense',
    ],
  ],
  'ww-spacing': [
    [
      'An opponent misses a long normal in front of you. What opportunity may exist?',
      [
        'Whiff punish the recovery',
        'Pause the match',
        'Lose all meter',
        'Change character mid-round',
      ],
      0,
      'A missed attack can expose recovery to a correctly timed punish.',
      'capcom-offense',
    ],
    [
      'What can a projectile help control?',
      [
        'Ground space and approach timing',
        'Controller battery',
        'Tournament seeding',
        'Screen resolution',
      ],
      0,
      'Projectiles occupy space and influence when an opponent can approach.',
      'capcom-sfii',
    ],
    [
      'Why is the corner strategically dangerous?',
      [
        'Retreat space is limited',
        'Inputs reverse permanently',
        'Blocking is disabled',
        'The timer stops',
      ],
      0,
      'With less space behind you, escape routes become more limited.',
      'capcom-offense',
    ],
    [
      'Compared with jumping, what advantage does walking often provide?',
      [
        'Lower commitment to reposition',
        'Guaranteed damage',
        'Invulnerability',
        'Automatic blocking',
      ],
      0,
      'Walking adjusts range without committing to a full jump arc.',
      'capcom-offense',
    ],
    [
      'Why test a normal at several distances?',
      [
        'Its useful range and risk change',
        'Its button changes color',
        'It gains infinite damage',
        'It removes the opponent',
      ],
      0,
      'Distance affects whether an attack connects and how punishable a miss becomes.',
      'capcom-offense',
    ],
    [
      'What is the main job of a low-commitment poke?',
      [
        'Claim space and gather a reaction',
        'End every round instantly',
        'Ignore all defense',
        'Change game settings',
      ],
      0,
      'A poke can contest space while revealing how the opponent responds.',
      'capcom-offense',
    ],
    [
      'Your opponent always backs away after blocking. What adaptation is sensible?',
      [
        'Use the gained space to advance safely',
        'Repeat from the same distance forever',
        'Stop observing',
        'Only jump backward',
      ],
      0,
      'If they yield ground, advancing converts that reaction into positional value.',
      'capcom-offense',
    ],
    [
      'Why identify an opponent character’s preferred range?',
      [
        'It helps choose where to contest',
        'It reveals their password',
        'It changes your controls',
        'It removes recovery',
      ],
      0,
      'Range awareness helps decide whether to approach, hold ground, or retreat.',
      'capcom-offense',
    ],
    [
      'What should change when an opponent proves they can answer your approach?',
      [
        'Your timing or route',
        'The game title',
        'Your monitor size',
        'The round count',
      ],
      0,
      'Adaptation means changing the pattern the opponent has demonstrated they can stop.',
      'capcom-offense',
    ],
    [
      'A spacing tip names exact ranges from an older patch. What should you do?',
      [
        'Verify it in the current version',
        'Treat it as permanent',
        'Ignore training mode',
        'Publish it as official',
      ],
      0,
      'Exact behavior is version-sensitive and should be rechecked.',
      'capcom-controls',
    ],
  ],
  'if-control': [
    [
      'In the four-limb control scheme, what do the main attack buttons represent?',
      [
        'Left and right arms and legs',
        'Four camera angles',
        'Four meters',
        'Four stages',
      ],
      0,
      'The core attack layout maps buttons to the character’s limbs.',
      'bandai-guide',
    ],
    [
      'In common notation, what does “1+2” communicate?',
      [
        'Press two attack buttons together',
        'Wait two seconds',
        'Win two rounds',
        'Move two spaces',
      ],
      0,
      'The plus sign indicates simultaneous inputs.',
      'bandai-guide',
    ],
    [
      'How does “1, 2” differ from “1+2”?',
      [
        'The comma indicates a sequence',
        'It means the same thing',
        'It means hold back',
        'It means pause',
      ],
      0,
      'Separated inputs describe a sequence rather than a simultaneous press.',
      'bandai-guide',
    ],
    [
      'When sides change, how should forward be interpreted?',
      [
        'Relative to the character’s facing',
        'Always screen-right',
        'Always up',
        'As no direction',
      ],
      0,
      'Directional commands are interpreted relative to facing.',
      'bandai-guide',
    ],
    [
      'What does holding down generally change?',
      [
        'The character enters a crouching state',
        'The match ends',
        'The stage rotates',
        'All attacks become throws',
      ],
      0,
      'Down changes the grounded stance and available options.',
      'bandai-guide',
    ],
    [
      'What does neutral mean in an input description?',
      [
        'No directional input is held',
        'All buttons are held',
        'The round is tied',
        'The character is airborne',
      ],
      0,
      'Neutral describes the stick or pad returning to no direction.',
      'bandai-guide',
    ],
    [
      'Why use an input-history display while practicing?',
      [
        'It reveals what the game actually received',
        'It increases damage',
        'It changes matchmaking',
        'It unlocks characters',
      ],
      0,
      'Input history makes execution errors visible.',
      'bandai-guide',
    ],
    [
      'Where should you learn a character-specific string?',
      [
        'The current command list',
        'A stage poster',
        'The credits',
        'A random scoreboard',
      ],
      0,
      'The current command list is the direct version-specific reference.',
      'bandai-guide',
    ],
    [
      'A move fails only after switching sides. What should you inspect?',
      [
        'Whether the directional input was mirrored',
        'The music volume',
        'The costume color',
        'The round number',
      ],
      0,
      'Facing-relative directions must be mirrored after a side switch.',
      'bandai-guide',
    ],
    [
      'Why attach the game version to notation notes?',
      [
        'Commands and properties can change',
        'It makes inputs faster',
        'It grants online access',
        'It changes the controller',
      ],
      0,
      'Version labels keep practice notes from becoming misleading.',
      'bandai-guide',
    ],
  ],
  'if-movement': [
    [
      'What extra movement dimension distinguishes a 3D fighter?',
      [
        'Stepping into or out of the screen',
        'Flying above the stage',
        'Moving the timer',
        'Changing camera menus',
      ],
      0,
      '3D movement includes lateral steps around the opponent.',
      'bandai-3d',
    ],
    [
      'Why can a sidestep beat some attacks?',
      [
        'Some attacks travel along a linear path',
        'Sidesteps block everything',
        'It pauses recovery',
        'It removes walls',
      ],
      0,
      'Lateral movement can avoid attacks that do not cover that direction.',
      'bandai-guide',
    ],
    [
      'Which attack level commonly checks a crouching opponent?',
      ['Mid', 'High', 'Throw from any range', 'No attack can'],
      0,
      'Mids are the conventional answer to opponents who crouch.',
      'bandai-guide',
    ],
    [
      'What defensive state is commonly used against lows?',
      [
        'Crouching guard',
        'Standing still without guard',
        'Jumping backward only',
        'Pause menu',
      ],
      0,
      'Low attacks generally require a low defensive response.',
      'bandai-guide',
    ],
    [
      'Why use a backdash?',
      [
        'Create space and make an attack miss',
        'Guarantee a launcher',
        'Disable tracking',
        'Reset the round',
      ],
      0,
      'A backdash can alter range and produce a whiff opportunity.',
      'bandai-guide',
    ],
    [
      'Why is sidestepping not a universal answer?',
      [
        'Some attacks track or cover lateral movement',
        'It costs every round',
        'It disables attacks',
        'It only works in menus',
      ],
      0,
      'Move coverage and timing determine whether a step succeeds.',
      'bandai-guide',
    ],
    [
      'What should you observe before choosing a step direction?',
      [
        'The opponent’s repeated attack route',
        'Their display name color',
        'The soundtrack',
        'The loading screen',
      ],
      0,
      'Recognizing the route helps test the appropriate lateral response.',
      'bandai-guide',
    ],
    [
      'Why track your position near a wall?',
      [
        'Movement and escape options become constrained',
        'Buttons stop working',
        'All attacks become low',
        'The timer doubles',
      ],
      0,
      'Walls change the value and availability of movement choices.',
      'bandai-guide',
    ],
    [
      'What makes range practice more useful than random movement?',
      [
        'It connects movement to a specific threat',
        'It unlocks stages',
        'It hides inputs',
        'It guarantees wins',
      ],
      0,
      'Movement is most useful when trained against a defined attack and distance.',
      'bandai-guide',
    ],
    [
      'An old guide says an attack never tracks. What is the safe next step?',
      [
        'Test it in the current version',
        'Assume it is permanent',
        'Delete your notes',
        'Never sidestep',
      ],
      0,
      'Tracking behavior is version-sensitive and belongs in current-version testing.',
      'bandai-guide',
    ],
  ],
  'if-launch': [
    [
      'What does a launcher create?',
      [
        'An airborne follow-up opportunity',
        'A new game install',
        'Permanent invulnerability',
        'A stage change',
      ],
      0,
      'Launchers put the opponent airborne so follow-ups can connect.',
      'bandai-guide',
    ],
    [
      'Why learn a stable air-combo route before a difficult one?',
      [
        'Reliability produces useful match practice',
        'It changes rank automatically',
        'It removes scaling',
        'It works in every game',
      ],
      0,
      'A reliable route lets the player consistently convert opportunities.',
      'bandai-guide',
    ],
    [
      'What should you prioritize when a combo drops often?',
      [
        'A repeatable route and clean timing',
        'More buttons at once',
        'A different screen',
        'Ignoring the first hit',
      ],
      0,
      'Consistency is more valuable than theoretical output that rarely completes.',
      'bandai-guide',
    ],
    [
      'After knocking an opponent down, what should you expect?',
      [
        'They have a set of recovery choices',
        'The match always ends',
        'They lose controls',
        'All damage resets',
      ],
      0,
      'Knockdowns lead into recovery decisions rather than one guaranteed outcome.',
      'bandai-guide',
    ],
    [
      'Why avoid automatic attacks on every wake-up?',
      [
        'Predictable choices can be baited and punished',
        'Attacks delete progress',
        'Wake-up has no inputs',
        'The stage changes',
      ],
      0,
      'Repeating one wake-up action makes your defense easy to read.',
      'bandai-guide',
    ],
    [
      'What defines a tag-team format?',
      [
        'More than one character can participate for a side',
        'Every attack is a throw',
        'There are no rounds',
        'Movement is 2D only',
      ],
      0,
      'Tag formats add teammate and switching considerations.',
      'bandai-3d',
    ],
    [
      'Why should strategy notes name the match format?',
      [
        'Team and solo formats create different decisions',
        'It changes font size',
        'It unlocks controllers',
        'It sets brightness',
      ],
      0,
      'Format determines which systems and resources are available.',
      'bandai-3d',
    ],
    [
      'What is a good first post-launch practice target?',
      [
        'Recognize the launch and complete one route',
        'Use every move',
        'Always chase maximum damage',
        'Ignore positioning',
      ],
      0,
      'A clear recognition-to-conversion loop builds a dependable foundation.',
      'bandai-guide',
    ],
    [
      'A combo works only near a wall. How should it be recorded?',
      [
        'As a position-specific route',
        'As universal',
        'As an input bug',
        'As an official rule',
      ],
      0,
      'Position is part of the condition and must remain attached to the result.',
      'bandai-guide',
    ],
    [
      'A new patch changes a launch property. What should happen to your plan?',
      [
        'Re-test and update the versioned note',
        'Keep the old claim',
        'Remove all practice',
        'Assume every combo still works',
      ],
      0,
      'Versioned verification keeps training advice accurate.',
      'bandai-guide',
    ],
  ],
}

const coreDomains: readonly Domain[] = [
  {
    id: 'ww-control',
    trackId: 'world-warrior',
    title: 'Control & notation',
    description: 'Facing, commands, charge timing, and clean inputs.',
  },
  {
    id: 'ww-defense',
    trackId: 'world-warrior',
    title: 'Defense & decisions',
    description: 'Guard, throws, anti-airs, and deliberate responses.',
  },
  {
    id: 'ww-spacing',
    trackId: 'world-warrior',
    title: 'Spacing & adaptation',
    description: 'Ranges, whiffs, corners, and pattern changes.',
  },
  {
    id: 'if-control',
    trackId: 'iron-fist',
    title: 'Control & notation',
    description: 'Four-limb inputs, sequences, and command literacy.',
  },
  {
    id: 'if-movement',
    trackId: 'iron-fist',
    title: 'Movement & attack levels',
    description: '3D steps, range, walls, and defensive levels.',
  },
  {
    id: 'if-launch',
    trackId: 'iron-fist',
    title: 'Launch, recovery & formats',
    description: 'Reliable conversions, wake-up, and match context.',
  },
]

export const domains: readonly Domain[] = [...coreDomains, ...legacyDomains]

export const tracks: readonly Track[] = [
  {
    id: 'world-warrior',
    title: 'World Warrior Fundamentals',
    shortTitle: 'World Warrior',
    description: 'A 2D fundamentals check for control, defense, and space.',
    domainIds: [
      'ww-control',
      'ww-defense',
      'ww-spacing',
      'legacy-xvsf',
      'legacy-mshvsf',
      'legacy-mvc1',
    ],
  },
  {
    id: 'iron-fist',
    title: 'Iron Fist Fundamentals',
    shortTitle: 'Iron Fist',
    description:
      'A 3D fundamentals check for notation, movement, and conversion.',
    domainIds: [
      'if-control',
      'if-movement',
      'if-launch',
      'legacy-tekken2',
      'legacy-t5dr',
    ],
  },
]

function makeQuestions(domainId: CoreDomainId, trackId: TrackId): Question[] {
  return domainSeeds[domainId].map(
    ([prompt, choices, correctIndex, rationale, sourceId], index) => ({
      id: `${domainId}-${String(index + 1).padStart(2, '0')}`,
      trackId,
      domainId,
      prompt,
      choices,
      correctIndex,
      rationale,
      sourceId,
      reviewedAt: '2026-07-28',
      rights: 'original-demo-copy',
    }),
  )
}

export const questions: readonly Question[] = [
  ...coreDomains.flatMap((domain) =>
    makeQuestions(domain.id as CoreDomainId, domain.trackId),
  ),
  ...legacyQuestions,
  ...supplementalQuestions,
]
export const questionsById = new Map(
  questions.map((question) => [question.id, question]),
)

const domainTrials: TrialDefinition[] = domains.map((domain) => ({
  id: domain.id,
  trackId: domain.trackId,
  domainId: domain.id,
  title: domain.title,
  questionCount: 10,
  questionIds: questions
    .filter(({ domainId }) => domainId === domain.id)
    .filter(({ id }) => !id.startsWith('mix-'))
    .map(({ id }) => id),
}))

const mixedTrial = (
  trackId: TrackId,
  id: string,
  title: string,
): TrialDefinition => ({
  id,
  trackId,
  domainId: 'mixed',
  title,
  questionCount: 30,
  questionIds: questions
    .filter((question) => question.trackId === trackId)
    .map(({ id: questionId }) => questionId),
})

export const trials: readonly TrialDefinition[] = [
  ...domainTrials,
  mixedTrial('world-warrior', 'ww-mixed', 'World Warrior Mixed Trial'),
  mixedTrial('iron-fist', 'if-mixed', 'Iron Fist Mixed Trial'),
]

export const trialsById = new Map(trials.map((trial) => [trial.id, trial]))
export const domainsById = new Map(domains.map((domain) => [domain.id, domain]))

export const sourceLabels: Record<SourceId, string> = {
  'capcom-controls': 'Capcom game manual: controls',
  'capcom-offense': 'Capcom Fighters Network: offense fundamentals',
  'capcom-sfii': 'Capcom Fighters Network: classic fundamentals',
  'bandai-guide': 'Bandai Namco: Tekken 8 beginner guide',
  'bandai-3d': 'Bandai Namco: fighting games overview',
  'capcom-xvsf': 'Capcom official manual: X-Men vs. Street Fighter',
  'capcom-mshvsf':
    'Capcom official manual: Marvel Super Heroes vs. Street Fighter',
  'capcom-mvc1': 'Capcom official manual: Marvel vs. Capcom 1',
  'playstation-tekken-history': 'PlayStation: Tekken series history',
  'playstation-t5dr': 'PlayStation: Tekken 5: Dark Resurrection',
}

export const sourceUrls: Record<SourceId, string> = {
  'capcom-controls':
    'https://game.capcom.com/manual/sfv/en-us/page.html?cat=2&subcat=2',
  'capcom-offense': 'https://game.capcom.com/cfn/sfv/column/131384',
  'capcom-sfii': 'https://game.capcom.com/cfn/sfv/column/132437?lang=en',
  'bandai-guide':
    'https://en.bandainamcoent.eu/tekken/news/tekken-8-the-guide-start-playing',
  'bandai-3d': 'https://en.bandainamcoent.eu/category/fighting-games',
  'capcom-xvsf': 'https://game.capcom.com/manual/MVCFC/en/switch/page/4/1',
  'capcom-mshvsf': 'https://game.capcom.com/manual/MVCFC/en/switch/page/5/1',
  'capcom-mvc1': 'https://game.capcom.com/manual/MVCFC/en/switch/page/6/1',
  'playstation-tekken-history':
    'https://blog.playstation.com/2025/03/05/tekken-a-playstation-history/',
  'playstation-t5dr': 'https://store.playstation.com/en-us/concept/10015859',
}
