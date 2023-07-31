export class EcrReport {
    sdkResponseMetadata?: any;
    findingSeverityCounts?: FindingSeverityCounts;
    registryId?: string;
    repositoryName?: string;
    sdkHttpMetadata?: any;
    imageId?: string;
    imageScanStatus?: ImageScanStatus;
    imageScanFindings?: ImageScanFindings;
}

export class ImageScanStatus {
    status?: string;
    description?: string;
}

export class ImageScanFindings {
    imageScanCompletedAt?: string;
    vulnerabilitySourceUpdatedAt?: string;
    findingSeverityCounts?: FindingSeverityCounts;
    findings?: any;
    enhancedFindings?: EnhancedFindings[];
}
export class FindingSeverityCounts {
    CRITICAL?: string;
    HIGH?: string;
    MEDIUM?: string;
    LOW?: string;
    UNTRIAGED?: string;
    UNDEFINED?: string;
}

export class EnhancedFindings {
    awsAccountId?: string;
    description?: string;
    findingArn?: string;
    firstObservedAt?: string;
    lastObservedAt?: string;
    packageVulnerabilityDetails?: PackageVulnerabilityDetails;
    remediation?: Remediation;
    resources?: any;
    score?: string;
    scoreDetails?: any;
    severity?: string;
    status?: string;
    title?: string;
    type?: string;
    updatedAt?: string;
}

export class Remediation{
    recommendation?: Recommendation;
}

export class Recommendation{
    url?: string;
    text?: string;
}

export class PackageVulnerabilityDetails {
    cvss?: any;
    referenceUrls?: string[];
    relatedVulnerabilities?: string[];
    source?: string;
    sourceUrl?: string;
    vendorCreatedAt?: string;    
    vendorSeverity?: string;
    vendorUpdatedAt?: string;
    vulnerabilityId?: string;
    vulnerablePackages?: VulnerablePackages[];
}


export class VulnerablePackages{
    arch?: string;
    epoch?: string;
    filePath?: string;
    name?: string;
    packageManager?: string;
    release?: string;
    sourceLayerHash?: string;
    version?: string;
}


export class ReporteEcr{
    nombre?: string;
    paquete?: string;
    gravedad?: string;
    descripcion?: string;
    estado?: string;
    referencia?: string;
    correcion?: string;
}