

# Battle Map App

The Battle Map App is a web-based tool for simulating battle maps in Dungeons and Dragons and other tabletop roleplaying games. The app allows users to create and manage maps, add and move player characters and NPCs, track game time, and manage status effects and events during combat.

## Features

- Create characters that include an image and stats
- Create and manage maps using Supabase to store map images and player character positions.
- Add and move player characters and NPCs on the map, and track their hit points, initiative, and movement speed.
- Track game time during combat using the current_game_time field in the sessions table, which allows for adjustments based on seconds, minutes, or hours using the INTERVAL keyword.
- Manage status effects and events during combat using the status_effects table, which tracks the duration of effects and allows for scheduling events to occur at specific times during the session.
- Support for multiple factions and characters belonging to multiple factions using the factions and faction_members tables.

## Requirements

The Battle Map App is built using Supabase, a PostgreSQL-based open source Firebase alternative. To run the app, you will need:

1. Clone the repository: `git clone https://github.com/dizolivemint/battle-map.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Installing and Updating Supabase

To install the Supabase client library for JavaScript in your project, use the following command:
`npm install supabase`

To update the Supabase schema and generate TypeScript types, you can use the `supabase` command-line interface (CLI). Here's the command to generate TypeScript types based on your Supabase schema:
`npx supabase gen types typescript --project-id "your-project-id" --schema public > lib/database.types.ts`

Replace "your-project-id" with the ID of your Supabase project. You can find this ID in the URL of your Supabase dashboard.

This command generates TypeScript types based on your Supabase schema and saves them to a file named `database.types.ts` in the `lib` directory of your project. Note that you may need to modify the generated TypeScript types to match your specific needs, as the generated types may not always be completely accurate or complete.

Make sure that your Supabase database is set up correctly and that you have the necessary permissions to access the schema before running this command.
    
## Contributing

We welcome contributions from the community! To contribute to Battle Map, follow these steps:

1. Fork the repository
2. Make your changes
3. Write unit tests
4. Submit a pull request

## License

NextLMS is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License](https://creativecommons.org/licenses/by-nc-nd/4.0/). This license prohibits the selling of the software without explicit permission from the owner. See [`LICENSE`](LICENSE.MD) for more information.
