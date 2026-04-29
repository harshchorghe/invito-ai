import { Composition, registerRoot } from "remotion";
import { InvitationScene } from "../components/InvitationScene";
import { DEFAULT_INVITATION_DRAFT } from "../lib/invitationDraft";

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="InvitationVideo"
        component={InvitationScene}
        durationInFrames={120}
        fps={30}
        width={720}
        height={960}
        defaultProps={{
          data: DEFAULT_INVITATION_DRAFT,
          type: "custom",
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
