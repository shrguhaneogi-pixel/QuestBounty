use anchor_lang::prelude::*;

declare_id!("H49TxiF1wQBq58JRd2ztqDnZxcG9AGLrn6wiZvaWEngW");

#[program]
pub mod quest_bounty {
    use super::*;

    // Placeholder instruction. Real instructions (initialize_user, create_quest,
    // accept_quest, submit_quest, verify_quest, claim_reward) land in Phase 1-2.
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("QuestBounty program bootstrap");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    pub system_program: Program<'info, System>,
}
