export class EcrTags {
    registryId?: string;
    repositoryName?: string;
    imageDigest?: string;  
    imageTags?: any; 
    imageSizeInBytes?: string;
    imagePushedAt?: string;
    imageScanStatus?: string;
    imageScanFindingsSummary?: string;
    imageManifestMediaType?: string;
    artifactMediaType?: string;
    lastRecordedPullTime?: string;
}
