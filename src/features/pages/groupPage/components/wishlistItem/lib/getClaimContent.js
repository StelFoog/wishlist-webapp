import React from "react";
import Button from "../../../../../components/button";

import { getFilteredUsers, getClaimedByUser } from "./";

const claimedBy = ({ claimedByUsers, handleClaim, users }) => (
  <div className="itemContent itemClaim">
    {claimedByUsers === undefined || claimedByUsers.length === 0 ? (
      <Button
        handleClick={handleClaim}
        variant="filled"
        label="Claim item"
        color="var(--color-primary)"
      />
    ) : (
      <React.Fragment>
        <h3>Claimed by:</h3>
        <div className="claimUsers">
          {getFilteredUsers(claimedByUsers, users).map(user =>
            getClaimedByUser(user)
          )}
        </div>
      </React.Fragment>
    )}
  </div>
);

export default claimedBy;
